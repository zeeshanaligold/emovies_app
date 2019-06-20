/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import Navigation from './views/layouts/Navigation'
import IntroSlider from './views/components/IntroSlider'
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay'
import { Provider } from './Contexts'
import { View } from 'react-native'
import client from './graphql/client'
import { GET_LOGGED_USER } from './graphql/queries'
console.disableYellowBox = true;
const App = () => {
  const [showLauncher, setShowLauncher] = useState(true)
  const [isLoading, handleLoading] = useState(false)
  const [isProgress, setProgress] = useState(false)
  const [profile, setProfile] = useState({})

  const handleProfile = async () => {
    await client
      .query({
        query: GET_LOGGED_USER,
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        setProfile(data.me)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    handleProfile()
    SplashScreen.hide()
  }, [])

  return (
    <Provider
      value={{
        profile,
        isLoading,
        handleLoading,
        handleProfile,
        isProgress,
        setProgress,
      }}
    >
      <View style={{ flex: 1 }}>
        {!showLauncher ? (
          <View style={{ flex: 1 }}>
            <Navigation screenProps={{ ...profile }} />
          </View>
        ) : (
          <IntroSlider onDone={() => setShowLauncher(false)} />
        )}
      </View>
      <Spinner
        color="#DB3069"
        visible={isLoading}
        overlayColor="#FFF"
        textContent={'Loading...'}
        textStyle={{ color: '#DB3069' }}
      />
      <Spinner
        color="#DB3069"
        visible={isProgress}
        textContent={'Progress...'}
        textStyle={{ color: '#DB3069' }}
      />
    </Provider>
  )
}

export default App
