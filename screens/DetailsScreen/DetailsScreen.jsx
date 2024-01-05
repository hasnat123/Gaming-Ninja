import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, Dimensions, Easing, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import UseFetch from '../../hooks/UseFetch'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlaystation, faXbox, faWindows } from '@fortawesome/free-brands-svg-icons'
import { faN, faXmark, faFaceLaughSquint, faSmile, faMeh, faFaceGrimace } from '@fortawesome/free-solid-svg-icons'

import { COLORS, SIZES } from '../../constants'
import styles from './DetailsScreen.style'
import Media from './components/Media/Media';
import Ratings from './components/Ratings/Ratings';
import GameSeries from './components/GameSeries/GameSeries';
import DLC from './components/DLC/DLC';
import { Image } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;

  const { data, isLoading, error, refetch } = UseFetch(`games/${id}`, {})

  useEffect(() =>
  {
    refetch()
  }, [id])
  
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const [descriptionLines, setDescriptionLines] = useState(0)
  const [readMore, setReadMore] = useState(false)

  const [isEnlarged, setIsEnlarged] = useState(false)
  const [isDetails, setIsDetails] = useState(false)
  const [enlargedPicture, setEnlargedPicture] = useState('')

  const widthArray = Array.from({ length: 4 }, () => useRef(new Animated.Value(0)).current)
  const ratingEmjois = [faFaceLaughSquint, faSmile, faMeh, faFaceGrimace]

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
  useEffect(() => {
    if (isDetails)
    {
      setTimeout(() =>
      {
        data.ratings.forEach((rating, index) =>
        {
          Animated.timing(widthArray[index], {
            toValue: rating.percent,
            easing: Easing.ease,
            duration: 1000,
            useNativeDriver: false
          }).start();
        })

      }, 2000)
    }

  }, [widthArray, data, isDetails]);

  const interpolatedWidths = widthArray.map((width) =>
    width.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    })
  );

  const HandleDate = (date) =>
  {
    const newDate = new Date(date)

    const day = newDate.getDate()
    const month = monthNames[newDate.getMonth()]
    const year = newDate.getFullYear()

    const formattedDate = `${month} ${day}, ${year}`

    return formattedDate
  }

  //Mapping platform names to icons
  const platforms =
  {
    'playstation' : faPlaystation,
    'xbox' : faXbox,
    'nintendo' : faN,
    'pc' : faWindows,
  }

  //Getting unique platform names
  const uniquePlatformNames = [...new Set(data?.platforms?.map(platform => {
    if (platform.platform.name.toLowerCase().includes('playstation')) {
        return 'playstation';
    }
    else if (platform.platform.name.toLowerCase().includes('xbox')) {
        return 'xbox';
    }
    else if (platform.platform.name.toLowerCase().includes('nintendo')) {
        return 'nintendo';
    }
    else if (platform.platform.name.toLowerCase().includes('pc')) {
        return 'pc';
    }
    else return ''
  }))];

  const HandleTextLayout = (event) => {
    const { lines } = event.nativeEvent

    setDescriptionLines(lines.length)
  };

  const HandleReadMore = () =>
  {
    setReadMore(!readMore)
  }

  const iconColors = [COLORS.rating_color_excellent, COLORS.rating_color_good, COLORS.rating_color_okay, COLORS.rating_color_bad]

  const HandleRating = (rating) =>
  {
    switch(rating)
    {
      case 'Everyone':
        return 'Everyone 6+';
      case 'Teen':
        return 'Teen 13+';
      case 'Mature':
        return 'Mature 17+';
      case 'Adults Only':
        return 'Adults Only 18+';
      case '':
        return 'Not Rated';
      default:
        return rating;
    }
  }

  const HandleRequirements = (text) =>
  {
    const indexMinimum = text?.indexOf('Minimum:')
    const indexRecommended = text?.indexOf('Recommended:')


    // Define the specific words you want to check for
    const specificWords = ['OS:', 'Storage:', 'Hard Disk Space:', 'Processor:', 'Memory:', 'Graphics:', 'Video Card:', 'Sound Card:', 'Sound:', 'Network:']

    let modifiedText = text

    const startIndex = modifiedText?.indexOf('Additional Notes:', 'Other requirements')
    if (startIndex !== -1) {
      let endIndex = modifiedText?.length
      // Find the first occurrence of any word from endWords after startIndex
      specificWords.forEach(endWord => {
        const endWordIndex = modifiedText?.indexOf(endWord, startIndex);
        if (endWordIndex !== -1 && endWordIndex < endIndex) {
          endIndex = endWordIndex
        }
      });
      // Remove the text between startWord and endWord
      modifiedText = modifiedText?.substring(0, startIndex) + modifiedText?.substring(endIndex)
    }

    specificWords.forEach(word => {
      const regex = new RegExp(`([^\\n])(${word})`, 'g')
      modifiedText = modifiedText?.replace(regex, '$1\n$2')
    });

    if (indexMinimum !== -1) {
      const minimumSubstring = modifiedText?.substring(0, indexMinimum) + modifiedText?.substring(indexMinimum + 'Minimum:'.length)
      return minimumSubstring.split('\n').filter(line => line.trim() !== '').join('\n\n')
    }

    if (indexRecommended !== -1) {
      const recommendedSubstring = modifiedText?.substring(0, indexRecommended) + modifiedText?.substring(indexRecommended + 'Recommended:'.length)
      return recommendedSubstring.split('\n').filter(line => line.trim() !== '').join('\n\n')
    }
    
    return modifiedText
  };

  return (
    <View style={styles.detailsScreenContainer}>
      {isLoading ?
      (
        <>
          <View style={styles.datePlatforms}>
            <Animated.View style={[styles.date, {backgroundColor: interpolatedBackgroundColor}]}><Text style={{color: 'transparent', fontWeight: '600'}}>1st Jan 2023</Text></Animated.View>
            <Animated.View style={[styles.date, {backgroundColor: interpolatedBackgroundColor}]}><Text style={{color: 'transparent', fontWeight: '600'}}>Lorem Ips</Text></Animated.View>
          </View>
          <Animated.View style={styles.nameContainer}>
            <Animated.View style={{backgroundColor: interpolatedBackgroundColor, borderRadius: SIZES.xxSmall, marginTop: SIZES.small}}><Text style={[styles.name, {color: 'transparent', fontWeight: '600', fontSize: 23}]}>Lorem Ipsum Dolor Lorem</Text></Animated.View>
            <Animated.View style={{backgroundColor: interpolatedBackgroundColor, borderRadius: SIZES.xxSmall, marginTop: SIZES.small}}><Text style={[styles.name, {color: 'transparent', fontWeight: '600', fontSize: 23}]}>Lorem Ipsum Dol</Text></Animated.View>
          </Animated.View>
          <View style={{flexDirection: 'row', gap: SIZES.large, padding: SIZES.small, marginTop: SIZES.xLarge}}>
            <Animated.View style={{backgroundColor: interpolatedBackgroundColor, width: 290, height: 170, borderRadius: SIZES.xSmall }}></Animated.View>
            <Animated.View style={{backgroundColor: interpolatedBackgroundColor, width: 290, height: 170, borderRadius: SIZES.xSmall }}></Animated.View>
          </View>
          <View style={{padding: SIZES.small, marginBottom: SIZES.xxLarge, marginTop: SIZES.xxLarge * 2, alignItems: 'center'}}>
            <Animated.View style={{backgroundColor: interpolatedBackgroundColor, width: '90%', height: SIZES.xxLarge * 2, borderRadius: SIZES.xSmall}}></Animated.View>
            <Animated.View style={{backgroundColor: interpolatedBackgroundColor, marginTop: SIZES.xxLarge * 2, width: '90%', height: SIZES.xxLarge * 2, borderRadius: SIZES.xSmall}}></Animated.View>
          </View>
        </>
      ) : error ?
      (
        <Text>Something went wrong</Text>
      ) :
      (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground src={data.background_image} resizeMode='cover' style={styles.background}>
            <LinearGradient
              colors={['rgba(17, 17, 17, 0.8)', 'rgba(17, 17, 17, 1)']}
              style={styles.gradient}
            />
          </ImageBackground>

          <View style={styles.datePlatforms}>
            <Text style={styles.date}>{HandleDate(data.released)}</Text>
            <View style={styles.platformContainer}>
              {uniquePlatformNames.filter(platform => platforms[platform]).map((platform) =>
              {
                return (
                    <FontAwesomeIcon key={platform} icon={platforms[platform]} size={20} style={styles.platformIcon}/>
                )
              })}
            </View>
          </View>
          
          <View style={styles.nameContainer}>
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.name}>{data.name}</Text>
          </View>
          
          {(data.movies_count > 0 || data.screenshots_count > 0) && <Media interpolatedBackgroundColor={interpolatedBackgroundColor} id={id} movies={data.movies_count} screenshots={data.screenshots_count} navigation={navigation} setIsEnlarged={setIsEnlarged} setEnlargedPicture={setEnlargedPicture}/>}

          <View style={{padding: SIZES.small}}>
            <Ratings averageRating={(data.rating - 1) * 25} ratings={data.ratings} count={data.ratings_count} metacritic={data.metacritic} setIsDetails={setIsDetails}/>

            <View style={{ marginBottom: SIZES.xxLarge, marginTop: SIZES.xxLarge }}>
              <Text style={styles.sectionHeader}>Summary</Text>
              <Text style={styles.description} numberOfLines={readMore ? 0 : 7} onTextLayout={HandleTextLayout}>
                {data.description_raw}
              </Text>
              {(descriptionLines > 7) && <TouchableOpacity style={styles.readMore} onPress={HandleReadMore}>
                <Text style={{color: COLORS.font_color_primary}}>{readMore ? 'Show Less' : 'Read More'}</Text>
              </TouchableOpacity>}
            </View>

            <Text style={[styles.sectionHeader, {marginTop: SIZES.xxLarge}]}>Additional Information</Text>
            <View style={styles.infoSection}>
                <View>
                  <Text style={styles.subSectionHeader}>Platforms</Text>
                  <View style={styles.infoContent}>
                    {data?.platforms?.map((platform, index) =>
                    (
                      <Text style={styles.infoText} key={index}>{index === data.platforms.length - 1 ? platform.platform.name : `${platform.platform.name},  `}</Text>
                    ))}  
                  </View>
                </View>
                <View>
                  <Text style={styles.subSectionHeader}>Genre</Text>
                  <View style={styles.infoContent}>
                    {data?.genres?.map((genre, index) =>
                    (
                      <Text style={styles.infoText} key={genre.id}>{index === data.genres.length - 1 ? genre.name : `${genre.name},  `}</Text>
                    ))}  
                  </View>
                </View>
                <View>
                  <Text style={styles.subSectionHeader}>Developers</Text>
                  <View style={styles.infoContent}>
                    {data?.developers?.map((developer, index) =>
                    (
                      <Text style={styles.infoText} key={developer.id}>{index === data.developers.length - 1 ? developer.name : `${developer.name},  `}</Text>
                    ))}  
                  </View>
                </View>
                <View>
                  <Text style={styles.subSectionHeader}>Age Rating</Text>
                  <Text style={styles.infoText}>{(HandleRating(data?.esrb_rating?.name)) ? HandleRating(data?.esrb_rating?.name) : 'Not Rated'}</Text>
                </View>
                <View>
                  <Text style={styles.subSectionHeader}>Publishers</Text>
                  <View style={styles.infoContent}>
                    {data?.publishers?.map((publisher, index) =>
                    (
                      <Text style={styles.infoText} key={publisher.id}>{index === data.publishers.length - 1 ? publisher.name : `${publisher.name},  `}</Text>
                    ))}  
                  </View>
                </View>
                <View>
                  <Text style={styles.subSectionHeader}>Release Date</Text>
                    <Text style={styles.infoText}>{HandleDate(data.released)}</Text>
                </View>
          </View>

            <View style={{marginBottom: SIZES.large, marginTop: SIZES.large}}>
              <Text style={styles.sectionHeader}>PC System Requirements</Text>
              {data?.platforms?.map((platform, index) =>
              {
                if (platform.platform.name.toLowerCase().includes('pc'))
                {
                  return (
                    <View key={index}>
                      {(platform.requirements.minimum || platform.requirements.recommended) ?
                      (
                        <View style={{ gap: SIZES.xxLarge, marginTop: SIZES.large }}>
                          {platform.requirements.minimum && (
                            <View>
                              <Text style={styles.subSectionHeader}>Minimum</Text>
                              <Text style={{ color: COLORS.font_color_primary, lineHeight: SIZES.large }}>
                                {HandleRequirements(platform.requirements.minimum)}
                              </Text>
                            </View>
                          )}

                          {platform.requirements.recommended && (
                            <View>
                              <Text style={styles.subSectionHeader}>Recommended</Text>
                              <Text style={{ color: COLORS.font_color_primary, lineHeight: SIZES.large }}>
                                {HandleRequirements(platform.requirements.recommended)}
                              </Text>
                            </View>
                          )}
                        </View>
                      ) :
                      (
                        <View style={{ marginTop: SIZES.xxSmall }}>
                          <Text style={styles.subSectionHeader}>N/A</Text>
                        </View>
                      )}
                    </View>
                  )
                }
              })}
            </View>

            <GameSeries id={id} navigation={navigation}/>
            
            <DLC id={id} navigation={navigation}/>
          </View>
        </ScrollView>
        </>

      )}

      {isEnlarged && (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setIsEnlarged(false)} style={[styles.xIcon, {position: 'absolute', right: SIZES.medium, top: SIZES.medium}]}>
            <FontAwesomeIcon icon={faXmark} size={35} style={styles.platformIcon}/>
          </TouchableOpacity>
          <Image
            style={styles.enlargedPicture}
            src={enlargedPicture}
          />
        </View>
      )}

      {isDetails && (
        <View style={styles.imageContainer}>
          <View style={styles.details}>
            <TouchableOpacity onPress={() => setIsDetails(false)} style={styles.xIcon}>
              <FontAwesomeIcon icon={faXmark} size={35} style={styles.platformIcon}/>
            </TouchableOpacity>
            <Text style={[styles.sectionHeader, {fontSize: SIZES.xLarge, marginTop: SIZES.xLarge}]}>User Ratings</Text>
            <View style={{gap: SIZES.xxLarge * 1.25, flex: 1, justifyContent: 'center'}}>
              {data.ratings.map((rating, index) =>
              (
                <View key={index} style={{width: '100%', flexDirection: 'row', alignItems: 'center', gap: SIZES.large}}>
                    <FontAwesomeIcon icon={ratingEmjois[index]} size={35} color={iconColors[index]}/>
                  <View style={styles.ratingBarContainer}>
                    <Animated.View style={[styles.ratingBar, {width: interpolatedWidths[index]} ]}></Animated.View>
                    <Text style={styles.rating}>{ index === 3 ? `${Math.ceil(rating.percent)}%` : `${Math.floor(rating.percent)}%` }</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default DetailsScreen