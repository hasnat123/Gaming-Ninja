import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { images } from './../..//../constants'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlaystation, faXbox, faWindows } from '@fortawesome/free-brands-svg-icons'
import { faN } from '@fortawesome/free-solid-svg-icons'

import styles from './GameCard.style'

const GameCard = ({ game, onPress }) => {

  //Mapping platform names to icons
  const platforms =
  {
    'playstation' : faPlaystation,
    'xbox' : faXbox,
    'nintendo' : faN,
    'pc' : faWindows,
  }

  //Getting unique platform names
  const uniquePlatformNames = [...new Set(game?.platforms?.map(platform => {
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
  
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.cardImageContainer}>
            {game.background_image ? <Image src={ game.background_image } style={styles.cardImage(true)}/> : <Image source={ images.DefaultBackgroundImage } style={styles.cardImage(false)}/>}
        </View>
        <View style={styles.textContainer}>
            <View style={styles.info}>
                <View style={styles.platformContainer}>
                    {uniquePlatformNames.filter(platform => platforms[platform]).map((platform) =>
                    {
                        return (
                            <FontAwesomeIcon key={platform} icon={platforms[platform]} size={19} style={styles.platformIcon}/>
                        )
                    })}
                </View>
                {game.metacritic && <Text style={styles.rating(game.metacritic)}>{ game.metacritic }</Text>}
            </View>
            <Text style={styles.name} numberOfLines={1}>{ game.name }</Text>
        </View>
    </TouchableOpacity>
  )
}

export default GameCard