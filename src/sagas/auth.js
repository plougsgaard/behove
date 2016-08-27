import { httpRequest } from '../services/network'
import { delay } from 'redux-saga'
import { take, put, call, race } from 'redux-saga/effects'
import sha256 from 'crypto-js/sha256'

import { types, actions } from '../reducers/auth'

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

export function* loginFlow () {
  while (true) {
    // await LOGIN_SUBMIT
    const { payload } = yield take(types.LOGIN_SUBMIT)
    // perform LOGIN_REQUEST
    yield put(actions.loginRequest(payload))
    // await response - store in variables
    const { success, error } = yield race({
      success: take(types.LOGIN_SUCCESS),
      error: take(types.LOGIN_ERROR)
    })
    if (error) {
      // do nothing
    } else if (success) {
      // also do nothing
    }
  }
}

export function* watchLoginRequest () {
  while (true) {
    try {
      // await LOGIN_REQUEST
      const { payload } = yield take(types.LOGIN_REQUEST)
      // make request
      const result = yield call(login, payload)
      // success?
      yield put(actions.loginSuccess(result))
    } catch (e) {
      yield put(actions.loginError(e))
    }
  }
}

export default function* rootSaga () {
  yield [
    watchLoginRequest(),
    loginFlow()
  ]
}
