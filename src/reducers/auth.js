import _ from 'lodash'
import { createAction } from 'redux-actions'

export const types = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_REQUEST_WAITING: 'auth/LOGIN_REQUEST_WAITING',
  LOGIN_REQUEST_DONE: 'auth/LOGIN_REQUEST_DONE',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_ERROR: 'auth/LOGIN_ERROR',
  LOGOUT: 'auth/LOGOUT'
}

export const actions = {
  loginRequest: createAction(types.LOGIN_REQUEST, (p) => _.pick(p, ['email', 'password'])),
  loginRequestWaiting: createAction(types.LOGIN_REQUEST_WAITING, (p) => undefined),
  loginRequestDone: createAction(types.LOGIN_REQUEST_DONE, (p) => undefined),
  loginSuccess: createAction(types.LOGIN_SUCCESS, (p) => _.pick(p, ['token'])),
  loginError: createAction(types.LOGIN_ERROR, (p) => _.pick(p, ['error'])),
  logout: createAction(types.LOGOUT, (p) => undefined)
}

export const initialState = {
  token: null,
  error: null,
  requestWaiting: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      // handled by loginFlow saga
      return state
    case types.LOGIN_REQUEST_WAITING:
      return {
        ...state,
        requestWaiting: true
      }
    case types.LOGIN_REQUEST_DONE:
      return {
        ...state,
        requestWaiting: false
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        error: null
      }
    case types.LOGOUT:
      return {
        ...state,
        token: null,
        error: null
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        error: action.payload.error
      }
    default:
      return state
  }
}
