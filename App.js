import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ScreenHeaderBtn from './components/common/header/HeaderBtn'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import SearchScreen from './screens/SearchScreen/SearchScreen'
import DetailsScreen from './screens/DetailsScreen/DetailsScreen'
import MediaScreen from './screens/MediaScreen/MediaScreen'
import { COLORS, icons, images, SIZES } from './constants'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar
        animated={true}
        style='light'
      />
        <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: COLORS.background_color_primary } }}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) =>
            ({
              headerStyle: { backgroundColor: COLORS.background_color_primary, height: 100 },
              headerShadowVisible: false,
              headerTitle: 'Gaming Ninja',
              headerTitleStyle: { color: COLORS.font_color_primary},
              navigation,
              headerLeft: () => (
                <ScreenHeaderBtn
                  iconUrl={icons.Logo}
                  dimension='100%'
                  marginLeft={12.5}
                  marginRight={-5}
                />
              ),
              headerRight: () => (
                <ScreenHeaderBtn
                  iconUrl={icons.search}
                  dimension='60%'
                  marginRight={12.5}
                  onPress={() => navigation.navigate('SearchScreen', { name: "Meow" })}
                />
              )
            })}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options=
            {{
              headerStyle: { backgroundColor: COLORS.background_color_primary, height: 100 },
              headerShadowVisible: false,
              headerTitle: 'Gaming Ninja',
              headerTitleStyle: { color: COLORS.font_color_primary},
              headerLeft: () => (
                <ScreenHeaderBtn
                  iconUrl={icons.Logo}
                  dimension='100%'
                  marginLeft={12.5}
                  marginRight={-5}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options=
            {{
              headerStyle: { backgroundColor: COLORS.background_color_primary, height: 100 },
              headerShadowVisible: false,
              headerTitle: 'Gaming Ninja',
              headerTitleStyle: { color: COLORS.font_color_primary},
              headerLeft: () => (
                <ScreenHeaderBtn
                  iconUrl={icons.Logo}
                  dimension='100%'
                  marginLeft={12.5}
                  marginRight={-5}
                />
              ),
            }}
          />
          <Stack.Screen
            name="MediaScreen"
            component={MediaScreen}
            options=
            {{
              headerStyle: { backgroundColor: COLORS.background_color_primary, height: 100 },
              headerShadowVisible: false,
              headerTitle: 'Gaming Ninja',
              headerTitleStyle: { color: COLORS.font_color_primary},
              headerLeft: () => (
                <ScreenHeaderBtn
                  iconUrl={icons.Logo}
                  dimension='100%'
                  marginLeft={12.5}
                  marginRight={-5}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}