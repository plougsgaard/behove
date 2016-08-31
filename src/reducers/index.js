import { combineReducers } from 'redux'

import numbers from './numbers'
import auth, { selectors as authSelectors } from './auth'

export default combineReducers({
  numbers,
  auth
})

export const selectors = {
  auth: {
    getToken: (state) => authSelectors.getToken(state.auth)
  }
}
