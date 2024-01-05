import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { View, Text, Button, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, Image, TouchableWithoutFeedback, Animated, Easing, Dimensions } from 'react-native'
import ListBtn from '../../components/common/ListBtn/ListBtn'
import { COLORS, SIZES, icons } from '../../constants'
import UseFetch from '../../hooks/UseFetch'
import GameCard from '../../components/common/GameCard/GameCard'

import styles from './HomeScreen.style'
import ScreenHeaderBtn from '../../components/common/header/HeaderBtn'

const HomeScreen = ({ navigation }) => {

  const [page, setPage] = useState(1);
  const [filterMenu, setFilterMenu] = useState(false);
  const [filter, setFilter] = useState({ name: 'Popular', id: '-popular' });
  const [genre, setGenre] = useState('all');

  const filters = [{ name: 'Top', id: '-metacritic' }, { name: 'Popular', id: '-popular' }, { name: 'Latest', id: '-released' }, { name: 'A - Z', id: 'name' }]
  const genres = [filter.name, 'all','action', 'adventure', 'indie', 'shooter', 'sports', 'racing', 'fighting', 'arcade', 'strategy', 'simulation']

  const { data, isLoading, error, refetch } = UseFetch('games',
  {
    page: page,
    ordering: filter.id,
    genres: genre === 'all' ? null : genre
  })

  useEffect(() =>
  {
    refetch()
  }, [page, filter, genre])

  const HandleFilter = (filter) =>
  {
    setFilter(filter)
    setFilterMenu(false)
    setPage(1)
  }

  const HandleGenre = (genreItem) =>
  {
    if (genreItem === genre) setGenre(null)
    else setGenre(genreItem)
    setPage(1)
  }

  const HandlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
        setPage(page - 1)
    } else if (direction === 'right') {
        setPage(page + 1)
    }
  }
  const backgroundColor = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColor, {
          toValue: 100,
          easing: Easing.ease,
          duration: 500,
          useNativeDriver: false
        }),
        Animated.timing(backgroundColor, {
          toValue: 0,
          easing: Easing.ease,
          duration: 500,
          useNativeDriver: false
        })
      ])
    ).start()


  }, [backgroundColor, isLoading]);
  
  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 100],
    outputRange: ['#292929', '#222222'],
  });
  return (
    <>
    <TouchableWithoutFeedback onPress={() => setFilterMenu(false)}>
      <View>
        {isLoading ?
        (
          <>
            <View style={{ flexDirection: 'row', gap: SIZES.small, padding: SIZES.small }}>
              <Animated.View style={{backgroundColor: interpolatedBackgroundColor, paddingHorizontal: SIZES.xSmall, paddingVertical: 5, borderRadius: 8}}>
                <Text style={{color: 'transparent'}}>Popularsdi</Text>
              </Animated.View>
              <Animated.View style={{backgroundColor: interpolatedBackgroundColor, paddingHorizontal: SIZES.xSmall, paddingVertical: 5, borderRadius: 8}}>
                <Text style={{color: 'transparent'}}>All</Text>
              </Animated.View>
              <Animated.View style={{backgroundColor: interpolatedBackgroundColor, paddingHorizontal: SIZES.xSmall, paddingVertical: 5, borderRadius: 8}}>
                <Text style={{color: 'transparent'}}>Action</Text>
              </Animated.View>
              <Animated.View style={{backgroundColor: interpolatedBackgroundColor, paddingHorizontal: SIZES.xSmall, paddingVertical: 5, borderRadius: 8}}>
                <Text style={{color: 'transparent'}}>Adventure</Text>
              </Animated.View>
            </View>
            <View style={{ alignItems: 'center', marginTop: SIZES.medium, marginBottom: 100 }}>
              <Animated.View style={{
                width:  Dimensions.get('window').width * 0.9,
                height: 300,
                backgroundColor: interpolatedBackgroundColor,
                marginTop: SIZES.medium,
                marginBottom: SIZES.medium,
                borderRadius: SIZES.large
              }}></Animated.View>
              <Animated.View style={{
                width:  Dimensions.get('window').width * 0.9,
                height: 300,
                backgroundColor: interpolatedBackgroundColor,
                marginTop: SIZES.medium,
                marginBottom: SIZES.medium,
                borderRadius: SIZES.large
              }}></Animated.View>
              <Animated.View style={{
                width:  Dimensions.get('window').width * 0.9,
                height: 300,
                backgroundColor: interpolatedBackgroundColor,
                marginTop: SIZES.medium,
                marginBottom: SIZES.medium,
                borderRadius: SIZES.large
              }}></Animated.View>
            </View>
          </>

        ) : error ?
        (
          <Text>Something went wrong</Text>
        ) :
        (
            <>
            <FlatList
              contentContainerStyle={{ backgroundColor: COLORS.background_color_primary }}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <View style={styles.categoriesContainer}>
                  <FlatList
                    data={genres}
                    renderItem={({ item }) =>
                    (
                      item === filter.name ?
                      <ListBtn text={item} genre={genre} onPress={() => setFilterMenu(true)} dropdown={true}/>
                      :
                      <ListBtn text={item} genre={genre} onPress={() => HandleGenre(item)}/>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ columnGap: SIZES.small, padding: SIZES.small }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
              ListFooterComponent={() => (
                <View style={{ alignItems: 'center', marginTop: SIZES.medium, marginBottom: 100 }}>
                  <FlatList
                    data={data}
                    renderItem={({ item }) =>
                    (
                      <GameCard game={item} onPress={() => navigation.navigate('DetailsScreen', { id: item.id })}/>
                    )}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={() => (
                      <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => HandlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => HandlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              )}
            />
            <View style={styles.overlay(filterMenu)}></View>
            <View style={styles.filterMenu(filterMenu)}>
            {filters.map((item, index) => (
              <Text key={index} style={styles.filter(item.name, filter.name)} onPress={() => HandleFilter(item)}>
                {item.name}
              </Text>
            ))}
            </View>
          </>

        )}
      </View>
    </TouchableWithoutFeedback>
    </>

  )
}

export default HomeScreen