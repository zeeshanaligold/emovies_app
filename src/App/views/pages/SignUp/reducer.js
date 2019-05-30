export const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return { ...state, ...action.payload }
    default:
      throw new Error('Unexpected action')
  }
}
