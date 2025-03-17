import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  getReactNativePersistence,
  setPersistence,
  inMemoryPersistence
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ENV } from '@/config/env'

const app = initializeApp({
  appId: ENV.APP_ID,
  projectId: ENV.PROJECT_ID,
  apiKey: ENV.API_KEY
})

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
setPersistence(auth, inMemoryPersistence)

export const db = getFirestore()

export const storage = getStorage(
  app,
  'gs://bank-tech-challenge-mobile.firebasestorage.app'
)
