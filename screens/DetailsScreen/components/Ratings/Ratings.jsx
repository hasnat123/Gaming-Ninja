import React, { useState, useEffect, useRef } from 'react'
import { Animated, Dimensions, Easing, Text, TouchableOpacity, View } from 'react-native'

import styles from './Ratings.style'
import { SIZES } from '../../../../constants'

const Ratings = ({ averageRating, ratings, count, metacritic, setIsDetails }) => {

  const widthAnimationCritic = useRef(new Animated.Value(0)).current
  const widthAnimationUser = useRef(new Animated.Value(0)).current


  useEffect(() => {
    setTimeout(() =>
    {
      Animated.timing(widthAnimationCritic, {
        toValue: metacritic,
        easing: Easing.ease,
        duration: 1000,
        useNativeDriver: false
      }).start();

      Animated.timing(widthAnimationUser, {
        toValue: averageRating,
        easing: Easing.ease,
        duration: 1000,
        useNativeDriver: false
      }).start();
    }, 2000)

  }, [widthAnimationCritic, widthAnimationUser]);
  
  const interpolatedWidthCritic = widthAnimationCritic.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const interpolatedWidthUser = widthAnimationUser.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  // console.log(widthAnimation)

  return (
    <View style={{ marginBottom: SIZES.xxLarge, marginTop: SIZES.xxLarge }}>
        {/* <Text>{count}</Text> */}
        {/* {ratings?.map((rating) =>
        (
            <View key={rating.id}>
                <Text>{rating.id}</Text>
                <Text>{rating.percent}%</Text>
            </View>
        ))} */}
      <View style={{ marginBottom: 50, alignSelf: 'center', width: '90%' }}>
        <Text style={styles.subSectionHeader}>Critic Ratings</Text>
        <View style={styles.ratingBarContainer}>
          {metacritic && <Animated.View style={[styles.ratingBar, {width: interpolatedWidthCritic} ]}></Animated.View>}
          <Text style={styles.rating}>{ `${metacritic}%` }</Text>
        </View>
      </View>

      <View style={{alignSelf: 'center', width: '90%'}}>
        <View style={styles.textRow}>
          <Text style={styles.subSectionHeader}>User Ratings</Text>
          <TouchableOpacity onPress={() => setIsDetails(true)}>
            {ratings && <Text style={styles.moreDetails}>Details</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.ratingBarContainer}>
          <Animated.View style={[styles.ratingBar, {width: interpolatedWidthUser} ]}></Animated.View>
          <Text style={styles.rating}>{ `${Math.floor(averageRating)}%` }</Text>
        </View>
      </View>
    </View>
  )
}

export default Ratings