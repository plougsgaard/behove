import { combineReducers } from 'redux'

const tokenReducer = () => ({})

export const persistentStoreBlacklist = []
export const persistentStoreWhitelist = []

export default combineReducers({
  token: tokenReducer
})
