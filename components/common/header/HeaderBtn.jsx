import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import styles from './HeaderBtn.style'

const ScreenHeaderBtn = ({ iconUrl, dimension, marginLeft, marginRight, onPress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer(marginLeft, marginRight)} onPress={onPress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn