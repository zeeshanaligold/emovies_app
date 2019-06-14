import gql from 'graphql-tag'

export const GET_MOVIES = gql`
  query GetMovies($first: Int, $skip: Int, $search: String, $category: String, $movieId: Int) {
    movies(first: $first, skip: $skip, search: $search, category: $category, movieId: $movieId) {
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
      totalRating
    }
  }
`
export const GET_REVIEWS = gql`
  query GetReviews($movieId: Int!, $rating: Float, $first: Int, $skip: Int) {
    reviews(movieId: $movieId, rating: $rating, first: $first, skip: $skip) {
      id
      userId
      rating
      comment
      timestamp
    }
  }
`
export const GET_LOGGED_USER = gql`
  query loggedUser {
    me {
      id
      email
      username
      firstName
      lastName
      lastLogin
      isStaff
    }
  }
`
