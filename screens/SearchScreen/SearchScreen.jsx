import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator, Animated, Easing, Dimensions } from 'react-native'

import styles from './SearchScreen.style'
import { COLORS, SIZES, icons } from '../../constants'
import UseFetch from '../../hooks/UseFetch'
import GameCard from '../../components/common/GameCard/GameCard'

const SearchScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, error, refetch } = UseFetch('games',
  {
    page: page,
    search: searchTerm
  })

  useEffect(() =>
  {
    refetch()
  }, [page, searchTerm])

  const HandleSearch = (text) =>
  {
    setSearchTerm(text)
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
    <View style={styles.searchScreenContainer}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={(text) => HandleSearch(text)}
          placeholder='What are you looking for?'
          placeholderTextColor='#ddd'
        />
      </View>
      <View>
        {isLoading ?
        (
          <View style={{ alignItems: 'center', marginBottom: 100 }}>
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
        ) : error ?
        (
          <Text>Something went wrong</Text>
        ) :
        (
          <FlatList
            data={data}
            renderItem={({ item }) =>
            (
              <GameCard game={item} onPress={() => navigation.navigate('DetailsScreen', { id: item.id })}/>
            )}
            keyExtractor={(item) => item.id}

            contentContainerStyle={{ alignItems: 'center' }}
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
          />)}
        </View>
    </View>
  )
}

export default SearchScreen