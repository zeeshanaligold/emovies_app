export const initialState = {
  first: 10,
  skip: 0,
  movies: [],
  isLoading: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, ...action.payload }
    case 'SET_MOVIES':
      return { ...state, ...action.payload }
    default:
      throw new Error('Unexpected action')
  }
}
