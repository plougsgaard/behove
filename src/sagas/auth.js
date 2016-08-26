import { httpRequest } from '../services/network'
import { delay } from 'redux-saga'
import { take, put, call, race } from 'redux-saga/effects'
import sha256 from 'crypto-js/sha256'

import {
  LOGIN_REQUEST, LOGIN_SUBMIT, LOGIN_SUCCESS, LOGIN_ERROR,
  loginRequest, loginError, loginSuccess
} from '../reducers/auth'

export function* watchLoginSubmit () {
  while (true) {
    // await LOGIN_SUBMIT
    const { payload } = yield take(LOGIN_SUBMIT)
    // perform LOGIN_REQUEST
    yield put(loginRequest(payload))
    // await response - store in variables
    const { success, error } = yield race({
      success: take(LOGIN_SUCCESS),
      error: take(LOGIN_ERROR)
    })
    if (error) {
      // do nothing
      console.warn(error)
    } else {
      // also do nothing
      console.log(success)
    }
  }
}

const makeDigest = ({ email, password }) =>
  sha256(`${email}${password}`).toString()

const login = async ({ email, password }) => {
  await delay(500)
  const digest = makeDigest({ email, password })
  const url = 'auth/login'
  const options = {
    method: 'post',
    body: {
      email,
      digest
    }
  }
  return await httpRequest(url, options)
}

export function* watchLoginRequest () {
  while (true) {
    try {
      // await LOGIN_REQUEST
      const { payload } = yield take(LOGIN_REQUEST)
      // make request
      const result = yield call(login, payload)
      // success?
      yield put(loginSuccess(result))
    } catch (e) {
      yield put(loginError(e))
    }
  }
}
