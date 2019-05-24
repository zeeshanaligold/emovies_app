/**
 * @format
 */

import React from 'react'
import { AppRegistry } from 'react-native'
import store from './src/App/redux/store'
import { ApolloProvider } from 'react-apollo'
import { name as appName } from './app.json'
import client from './src/App/graphql/client'
import { Provider } from 'react-redux'
import App from './src/App'

const Redux = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => Redux)
