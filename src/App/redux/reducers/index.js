import * as userReducer from './user_reducer'
import { combineReducers } from 'redux'

export default combineReducers(Object.assign(userReducer))
