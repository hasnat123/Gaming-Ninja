import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import styles from './ListBtn.style'

const ListBtn = ({ text, genre, onPress, dropdown }) => {
  return (
    <TouchableOpacity style={styles.btn(text, genre)} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
        {dropdown && <FontAwesomeIcon icon={faChevronDown} size={13} style={styles.dropdown}/>}
    </TouchableOpacity>
  )
}

export default ListBtn