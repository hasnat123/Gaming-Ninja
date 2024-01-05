import React from 'react'
import UseFetch from '../../../../hooks/UseFetch'
import { Text, View } from 'react-native'

import styles from './GameSeries.style'

import { SIZES } from '../../../../constants'
import GameCard from '../../../../components/common/GameCard/GameCard'

const GameSeries = ({ id, navigation }) => {

  const { data, isLoading, error, refetch } = UseFetch(`games/${id}/game-series`,{})

  return (
    <View style={{marginTop: SIZES.xxLarge * 1.5, marginBottom: SIZES.xxLarge * 1.5}}>
      <Text style={styles.sectionHeader}>Other Games in Series</Text>
      <View style={styles.gamesContainer}>
        {data?.results?.map((game) =>
        (
          <GameCard key={game.id} game={game} onPress={() => navigation.navigate('DetailsScreen', { id: game.id })}/>
        ))}
      </View>
    </View>
  )
}

export default GameSeries