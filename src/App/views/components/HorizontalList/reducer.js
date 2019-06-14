export const initialState = {
  first: 10,
  skip: 0,
  movies: [],
  numColumns: 2,
  screenWidth: 0,
  isLoading: false,
  search: null,
  onEndReachedCalledDuringMomentum: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.payload }
    default:
      throw new Error('Unexpected action')
  }
}
