import ApolloClient from 'apollo-boost'

// the Apollo cache is set up automatically
const client = new ApolloClient({
  uri: 'http://10.0.2.2:8000/graphql/',
})

export default client
