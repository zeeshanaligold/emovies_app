/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Navigation from './views/layouts/Navigation'
import IntroSlider from './views/components/IntroSlider'
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  const [showLauncher, setShowLauncher] = useState(false)

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {!showLauncher ? (
        <View style={{ flex: 1 }}>
          <Navigation />
        </View>
      ) : (
        <IntroSlider onDone={() => setShowLauncher(false)} />
      )}
    </View>
  )
}

export default App
