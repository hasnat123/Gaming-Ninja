import { Stack } from 'expo-router'
import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

//Splashcreen shows when app is loading
SplashScreen.preventAutoHideAsync()

const Layout = () =>
{
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
    })

    const onLayoutRootView = useCallback(async () =>
    {
        if (fontsLoaded)
        {
            await SplashScreen.hideAsync() //Show home screen if fonts loaded
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null

    return <Stack onLayout={onLayoutRootView}/>
}

export default Layout