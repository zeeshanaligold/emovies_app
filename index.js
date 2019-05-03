/**
 * @format
 */

import React from 'react'
import { AppRegistry } from 'react-native'
import store from './src/App/redux/store'
import { Provider } from 'react-redux'
import { name as appName } from './app.json'
import App from './src/App'

const Redux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
