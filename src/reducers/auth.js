import _ from 'lodash'
import { createAction } from 'redux-actions'

export const types = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_REQUEST_WAITING: 'auth/LOGIN_REQUEST_WAITING',
  LOGIN_REQUEST_DONE: 'auth/LOGIN_REQUEST_DONE',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_ERROR: 'auth/LOGIN_ERROR',
  LOGOUT: 'auth/LOGOUT',
  RENEW_SESSION_REQUEST: 'auth/RENEW_SESSION_REQUEST',
  RENEW_SESSION_SUCCESS: 'auth/RENEW_SESSION_SUCCESS'
}

export const actions = {
  loginRequest: createAction(types.LOGIN_REQUEST, (p) => _.pick(p, ['email', 'password'])),
  loginRequestWaiting: createAction(types.LOGIN_REQUEST_WAITING, (p) => undefined),
  loginRequestDone: createAction(types.LOGIN_REQUEST_DONE, (p) => undefined),
  loginSuccess: createAction(types.LOGIN_SUCCESS, (p) => _.pick(p, ['token'])),
  loginError: createAction(types.LOGIN_ERROR, (p) => _.pick(p, ['error'])),
  logout: createAction(types.LOGOUT, (p) => undefined),
  renewSessionRequest: createAction(types.RENEW_SESSION_REQUEST, (p) => undefined),
  renewSessionSuccess: createAction(types.RENEW_SESSION_SUCCESS, (p) => _.pick(p, ['token', 'expired_at'])),
}

export const selectors = {
  getToken: (state) => state.token
}

// state partition when there is no token
const noToken = { token: null, tokenExpiredAt: null }

export const initialState = {
  ...noToken,
  error: null,
  loginRequestWaiting: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        ...noToken
      }
    case types.LOGIN_REQUEST_WAITING:
      return {
        ...state,
        loginRequestWaiting: true
      }
    case types.LOGIN_REQUEST_DONE:
      return {
        ...state,
        loginRequestWaiting: false
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
        ...noToken,
        error: null
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        ...noToken,
        error: action.payload.error
      }
    case types.RENEW_SESSION_REQUEST:
      return state
    case types.RENEW_SESSION_SUCCESS:
      return {
        ...state,
        tokenExpiredAt: action.payload.expired_at
      }
    default:
      return state
  }
}
