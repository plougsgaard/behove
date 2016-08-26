// Actions

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

export default function reducer (state = {}, action = {}) {
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
