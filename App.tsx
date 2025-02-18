import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Dashboard } from "@/screens"
import '@/styles/global.css'

export default function App() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
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
      <Dashboard />
      <StatusBar style="auto" />
    </GluestackUIProvider>
  )
}
