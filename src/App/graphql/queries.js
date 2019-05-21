import gql from 'graphql-tag'

export const GET_MOVIES = gql`
  query GetMovies($first: Int) {
    movies(first: $first) {
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
