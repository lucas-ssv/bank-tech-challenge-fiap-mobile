import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = '@banktech:blurred-balance'

export const setStorageBalanceBlurred = async (value: string) => {
  await AsyncStorage.setItem(KEY, value)
}

export const getStorageBalanceBlurred = async () => {
  return await AsyncStorage.getItem(KEY)
}
