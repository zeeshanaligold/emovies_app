import AsyncStorage from '@react-native-community/async-storage'

export const saveKey = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log('AsyncStorage Error: ', error.message)
  }
}

export const getKey = async key => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (error) {
    console.log('AsyncStorage Error: ', error.message)
  }
}

export const deleteKey = async key => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log('AsyncStorage Error: ', error.message)
  }
}
