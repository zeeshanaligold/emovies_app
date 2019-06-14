export const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  isProgress: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return { ...state, ...action.payload }
    default:
      throw new Error('Unexpected action')
  }
}
