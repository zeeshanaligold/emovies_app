/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Login from './views/pages/Login'
import Navigation from './views/layouts/Navigation'
import IntroSlider from './views/components/IntroSlider'
import SplashScreen from 'react-native-splash-screen'

const App = ({ isLoggedIn }) => {
  const [showLauncher, setShowLauncher] = useState(true)

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {!showLauncher ? (
        <View style={{ flex: 1 }}>
          <Navigation />
          {!isLoggedIn && <Login />}
        </View>
      ) : (
        <IntroSlider onDone={() => setShowLauncher(false)} />
      )}
    </View>
  )
}

let mapStateToProp = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

export default connect(
  mapStateToProp,
  null
)(App)
