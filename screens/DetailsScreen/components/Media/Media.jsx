import React, { useState, useRef, useEffect } from 'react'
import { Animated, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { API_KEY } from '@env'
import { Video, ResizeMode, VideoFullscreenUpdate } from 'expo-av';
import VideoPlayer from 'expo-video-player';

import styles from './Media.style';
import { COLORS, SIZES } from '../../../../constants';

const Media = ({ interpolatedBackgroundColor, id, movies, screenshots, navigation, setIsEnlarged, setEnlargedPicture }) => {

    const playbackInstance = useRef(null)
    const [status, setStatus] = useState({})
    const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({ position: 0, duration: 0, state: 'Buffering' });

    const APIKey = API_KEY

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [data2, setData2] = useState([])
    const [isLoading2, setIsLoading2] = useState(false)
    const [error2, setError2] = useState(null)

    const [isFullscreen, setIsFullscreen] = useState(false)
    const [videoCount, setVideoCount] = useState(0)
    const [pictureCount, setPictureCount] = useState(0)
    
    const [allMovies, setAllMovies] = useState([])
    const [allPictures, setAllPictures] = useState([])



    const options = {
      method: 'GET',
      url: `https://api.rawg.io/api/games/${id}/movies?key=${APIKey}`
    };
      
    const options2 = {
      method: 'GET',
      url: `https://api.rawg.io/api/games/${id}/screenshots?key=${APIKey}`
    };

    const fetchData = async () =>
    {
        setIsLoading(true)

        try {
          if (movies > 0)
          {
            const res = await axios.request(options)
            setData(res.data.results[0])
            setAllMovies(res.data.results)
            setVideoCount(res.data.results.length)
          }

          if (screenshots > 0)
          {
            const res2 = await axios.request(options2)
            setData2(res2.data.results.slice(0, 5))
            setAllPictures(res2.data.results)
            setPictureCount(res2.data.results.length)
          }

        } catch (error) {
          setError(error)
          alert('There is an error')
        } finally {
          setIsLoading(false)
        }
    }

    useEffect(() =>
    {
      fetchData()
    }, [])

    const HandlePictureEnlarge = (picture) =>
    {
      setIsEnlarged(true)
      setEnlargedPicture(picture)
    }

    const HandleFullscreen = () =>
    {
      playbackInstance.current.presentFullscreenPlayer()
    }

  return (
    <View>
      {isLoading ?
      (
        <View style={{flexDirection: 'row', gap: SIZES.large, padding: SIZES.small, marginTop: SIZES.large}}>
          <Animated.View style={{backgroundColor: interpolatedBackgroundColor, width: 290, height: 170, borderRadius: SIZES.xSmall }}></Animated.View>
          <Animated.View style={{backgroundColor: interpolatedBackgroundColor, width: 290, height: 170, borderRadius: SIZES.xSmall }}></Animated.View>
        </View>
      ) : error ?
      (
        <Text>Something went wrong</Text>
      ) :
      (
        <FlatList
          data={data.data ? [data, ...data2] : data2}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.large, padding: SIZES.small, marginTop: SIZES.large }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={20}
          renderItem={({ item }) =>
          (
            item.data ?
            (<View style={{borderRadius: SIZES.xSmall, overflow: 'hidden'}}>
              <VideoPlayer
                style={styles.video}
                slider={{visible: false}}
                fullscreen={{visible: false}}
                timeVisible={false}
                videoProps={{
                  ref: playbackInstance,
                  shouldPlay: true,
                  onFullscreenUpdate: ({ fullscreenUpdate }) => {
                    if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT)
                    {
                      playbackInstance.current.setPositionAsync(0)
                      setIsFullscreen(true)
                    }
                    else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS) setIsFullscreen(false)
                  },
                  resizeMode: ResizeMode.CONTAIN,
                  source: {
                    uri: item.data.max
                  },
                  isMuted: !isFullscreen,
                  isLooping: !isFullscreen,
                }}
                icon={{
                  play: <></>,
                  pause: <></>,
                }}
              />
              <TouchableOpacity onPress={HandleFullscreen} style={styles.fullscreenContainer}>
                <Text style={styles.fullscreen}>Play Fullscreen</Text>
              </TouchableOpacity>
            </View>) :
            (<TouchableOpacity onPress={() => HandlePictureEnlarge(item?.image)}><Image src={ item.image } style={styles.image}/></TouchableOpacity>)
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={(videoCount > 1 || pictureCount > 5) && <TouchableOpacity style={styles.viewMore} onPress={() => navigation.navigate('MediaScreen', { movies: allMovies, pictures: allPictures })}><Text style={{ fontSize: SIZES.large, color: COLORS.font_color_primary }}>View More</Text></TouchableOpacity>}
        />
      )}

    </View>
  )
}

export default Media