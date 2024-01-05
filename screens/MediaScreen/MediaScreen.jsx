import { useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Video, ResizeMode, VideoFullscreenUpdate } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { COLORS, SIZES } from '../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './MediaScreen.style';
import { FlatList } from 'react-native';

const MediaScreen = () => {

  const route = useRoute();
  const { movies, pictures } = route.params;

  const playbackInstance = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [url, setUrl] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const HandlePlay = (url) =>
  {
    setIsPlaying(true)
    setUrl(url)
  };

  const HandleStop = () =>
  {
    setIsPlaying(false)
    setUrl('')
  }

  return (
    <>
      {isPlaying &&
      (
        <View style={styles.videoContainer}>
          <TouchableOpacity onPress={HandleStop} style={styles.xIcon}>
            <FontAwesomeIcon icon={faXmark} size={35} color={COLORS.font_color_primary}/>
          </TouchableOpacity>
          <View style={{borderRadius: SIZES.large, overflow: 'hidden'}}>
            <VideoPlayer
              style={styles.video}
              fullscreen={{enterFullscreen: () => playbackInstance.current.presentFullscreenPlayer()}}
              videoProps={{
                ref: playbackInstance,
                resizeMode: ResizeMode.CONTAIN,
                source: {
                  uri: url
                },
                isMuted: !isFullscreen,
                shouldPlay: isPlaying,
                onFullscreenUpdate: ({ fullscreenUpdate }) => {
                  if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT)
                  {
                    playbackInstance.current.setPositionAsync(0)
                    setIsFullscreen(true)
                  }
                  else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_DISMISS) setIsFullscreen(false)
                },
              }}
            />
          </View>

          <TouchableOpacity onPress={() => playbackInstance.current.presentFullscreenPlayer()} style={styles.fullscreenContainer}>
            <Text style={styles.fullscreen}>Play Fullscreen</Text>
          </TouchableOpacity>
        </View>
      )}


      <FlatList
        ListHeaderComponent={movies.length > 0 && <Text style={styles.sectionHeader}>All Videos</Text>}
        data={movies}
        contentContainerStyle={{ gap: SIZES.xxLarge, padding: SIZES.small, paddingBottom: 60, marginTop: movies.length > 0 ? SIZES.large : 0 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) =>
        (
          <View style={styles.container}>
            <Image
              src={item?.preview}
              style={styles.thumbnail}
            />
            <TouchableOpacity style={styles.playIcon} onPress={() => HandlePlay(item?.data.max)}>
              <FontAwesomeIcon color='#fff' icon={faCirclePlay} size={50}/>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent= 
        {
          <FlatList
            ListHeaderComponent={pictures.length > 0 && <Text style={styles.sectionHeader}>All Pictures</Text>}
            data={pictures}
            style={{ gap: SIZES.xxLarge, marginTop: SIZES.large }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
            (
                <Image src={ item?.image } style={styles.image}/>
            )}
            keyExtractor={(item) => item.id}
          />
        }
      />



    </>


  )
}

export default MediaScreen