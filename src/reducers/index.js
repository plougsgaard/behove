import { combineReducers } from 'redux'

import numbers from './numbers'

const tokenReducer = () => ({})

export const persistentStoreBlacklist = []
export const persistentStoreWhitelist = []

export default combineReducers({
  token: tokenReducer,
  numbers
})
