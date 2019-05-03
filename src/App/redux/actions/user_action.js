import { USER_LOGIN, USER_LOGOUT } from '../constants'

export function login(user) {
  return dispatch => {
    dispatch({
      type: USER_LOGIN,
      payload: user,
    })
  }
}

export function logout() {
  return dispatch => {
    dispatch({
      type: USER_LOGOUT,
      payload: null,
    })
  }
}
