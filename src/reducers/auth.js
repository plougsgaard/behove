import _ from 'lodash'
import { createAction } from 'redux-actions'

export const types = {
  LOGIN_SUBMIT: 'auth/LOGIN_SUBMIT',
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_REQUEST_WAITING: 'auth/LOGIN_REQUEST_WAITING',
  LOGIN_REQUEST_DONE: 'auth/LOGIN_REQUEST_DONE',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_ERROR: 'auth/LOGIN_ERROR',
  LOGOUT: 'auth/LOGOUT'
}

export const actions = {
  loginSubmit: createAction(types.LOGIN_SUBMIT, (p) => _.pick(p, ['email', 'password'])),
  loginRequest: createAction(types.LOGIN_REQUEST, (p) => _.pick(p, ['email', 'password'])),
  loginRequestWaiting: createAction(types.LOGIN_REQUEST_WAITING, (p) => undefined),
  loginRequestDone: createAction(types.LOGIN_REQUEST_DONE, (p) => undefined),
  loginSuccess: createAction(types.LOGIN_SUCCESS, (p) => _.pick(p, ['token'])),
  loginError: createAction(types.LOGIN_ERROR, (p) => ({ ...p, error: true })),
  logout: createAction(types.LOGOUT, (p) => undefined)
}

const initialState = {
  token: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token
      }
    case types.LOGOUT:
      return {
        ...state,
        token: null
      }
    default:
      return state
  }
}
