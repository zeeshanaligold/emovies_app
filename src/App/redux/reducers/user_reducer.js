import { USER_LOGIN, USER_LOGOUT } from '../constants'

const INITIAL_STATE = {
  loggedUser: null,
  isLoggedIn: true,
}

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loggedUser: action.payload,
        isLoggedIn: true,
      }
    case USER_LOGOUT:
      return {
        ...state,
        loggedUser: action.payload,
        isLoggedIn: false,
      }
    default:
      return state
  }
}
