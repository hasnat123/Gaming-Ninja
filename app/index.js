import 'react-native-gesture-handler';
import { useState } from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { ScreenHeaderBtn } from '../components'

import { COLORS, icons, images, SIZES } from '../constants'

const Home = () =>
{

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerTitle: '',
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
                        )
                    }}
                />
            </SafeAreaView>
        </>
    )
}

export default Home