/**
 * @format
 */

import React from 'react'
import { AppRegistry } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { name as appName } from './app.json'
import client from './src/App/graphql/client'
import App from './src/App'

const Redux = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => Redux)
