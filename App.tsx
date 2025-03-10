import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { Routes } from '@/routes'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/styles/global.css'
import 'react-native-gesture-handler'

export default function App() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Montserrat_400Regular,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <GluestackUIProvider mode="light">
      <Routes />
      <StatusBar style="light" />
    </GluestackUIProvider>
  )
}
