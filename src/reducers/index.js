import { combineReducers } from 'redux'

import numbers from './numbers'
import auth from './auth'

export const persistentStoreBlacklist = []
export const persistentStoreWhitelist = []

export default combineReducers({
  numbers,
  auth
})
