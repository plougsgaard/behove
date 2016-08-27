import _ from 'lodash'
import { createAction } from 'redux-actions'

export const types = {
  LOGIN_SUBMIT: 'auth/LOGIN_SUBMIT',
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_ERROR: 'auth/LOGIN_ERROR',
  LOGOUT: 'auth/LOGOUT'
}

export const actions = {
  loginSubmit: createAction(types.LOGIN_SUBMIT, (p) => _.pick(p, ['email', 'password'])),
  loginRequest: createAction(types.LOGIN_REQUEST, (p) => _.pick(p, ['email', 'password'])),
  loginSuccess: createAction(types.LOGIN_SUCCESS, (p) => _.pick(p, ['token'])),
  loginError: createAction(types.LOGIN_ERROR, (p) => ({ ...p, error: true })),
  logout: createAction(types.LOGOUT, (p) => _.omit(p, 'payload')),
}

export const LOGIN_SUBMIT = 'auth/LOGIN_SUBMIT'
export const loginSubmit = (payload) => ({ type: LOGIN_SUBMIT, payload })

export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST'
export const loginRequest = (payload) => ({ type: LOGIN_REQUEST, payload })

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload })

export const LOGIN_ERROR = 'auth/LOGIN_ERROR'
export const loginError = (payload) => ({ type: LOGIN_ERROR, payload, error: true })

export const LOGOUT = 'auth/LOGOUT'
export const logout = () => ({ type: LOGOUT })

// Reducer

const initialState = {
  token: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
