export const initialState = {
  first: 10,
  skip: 0,
  movies: [],
  isLoading: false,
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
