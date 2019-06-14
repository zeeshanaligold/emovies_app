import ApolloClient from 'apollo-boost'
import { getKey } from '../services/deviceStorage'

// the Apollo cache is set up automatically
const client = new ApolloClient({
  uri: 'http://10.0.2.2:8000/graphql/',
  request: async operation => {
    const token = await getKey('user_token').then(value => value)
    operation.setContext({
      headers: {
        Authorization: token ? `JWT ${token}` : '',
      },
    })
  },
})

export default client
