import gql from 'graphql-tag'

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
export const UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
  ) {
    updateUser(
      input: {
        username: $username
        password: $password
        lastName: $lastName
        firstName: $firstName
      }
      id: $id
    ) {
      status
    }
  }
`

export const RATE_MOVIE = gql`
  mutation createReview($userId: ID!, $movieId: ID!, $rating: Float!, $comment: String!) {
    createReview(
      input: { userId: $userId, movieId: $movieId, rating: $rating, comment: $comment }
    ) {
      status
    }
  }
`
