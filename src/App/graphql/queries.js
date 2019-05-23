import gql from 'graphql-tag'

export const GET_MOVIES = gql`
  query GetMovies($first: Int, $skip: Int) {
    movies(first: $first, skip: $skip) {
      id
      title
      genres
      avgRating
    }
  }
`
export const GET_MOVIE = gql`
  query GetMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      genres
      trailer {
        youtubeId
      }
      link {
        imdbId
        tmdbId
      }
      avgRating
    }
  }
`
// mutations
export const SIGN_IN = gql`
  mutation loginUser($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`
export const SIGN_UP = gql`
  mutation signUpUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      input: {
        email: $email
        username: $username
        password: $password
        lastName: $lastName
        firstName: $firstName
      }
    ) {
      status
    }
  }
`
