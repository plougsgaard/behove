import { postRequest, authenticatedPostRequest } from '../services/network'
import { takeLatest } from 'redux-saga'
import { select, take, put, call, race } from 'redux-saga/effects'
import sha256 from 'crypto-js/sha256'

import { types, actions } from '../reducers/auth'
import { selectors } from '../reducers'

export const makeDigest = ({ email, password }) => sha256(`${email}${password}`).toString()

//  ███████╗███████╗███████╗███████╗ ██████╗████████╗███████╗
//  ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝██╔════╝
//  █████╗  █████╗  █████╗  █████╗  ██║        ██║   ███████╗
//  ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║   ╚════██║
//  ███████╗██║     ██║     ███████╗╚██████╗   ██║   ███████║
//  ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝

export function* loginEffect ({ email, password }) {
  const digest = makeDigest({ email, password })
  const url = 'auth/login'
  const body = {
    email,
    digest
  }
  const { error, ...loginResponse } = yield call(postRequest, url, body)
  return error
    ? { error }
    : { ...loginResponse }
}

export function* logoutEffect () {

}

export function* renewSessionEffect () {
  const url = 'users/renew'
  const token = yield select(selectors.auth.getToken)
  const request = yield call(authenticatedPostRequest, token)
  const { error, expired_at } = yield call(request, url)
  return error
    ? { error }
    : { token, expired_at }
}

//  ███████╗ █████╗  ██████╗  █████╗ ███████╗
//  ██╔════╝██╔══██╗██╔════╝ ██╔══██╗██╔════╝
//  ███████╗███████║██║  ███╗███████║███████╗
//  ╚════██║██╔══██║██║   ██║██╔══██║╚════██║
//  ███████║██║  ██║╚██████╔╝██║  ██║███████║
//  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

/**
 * takeLatest(types.LOGIN_REQUEST, loginFlow)
 */
export function* loginFlow ({ payload }) {
  const first = yield race({
    login: call(loginEffect, payload),
    logout: take(types.LOGOUT)
  })
  // the wait is over
  yield put(actions.loginRequestDone())

  if (first.login) {
    const { error, ...loginResponse } = first.login
    if (error) {
      yield put(actions.loginError({ error }))
    } else {
      yield put(actions.loginSuccess({ ...loginResponse }))
    }
  } else if (first.logout) {
    yield call(logoutEffect)
  }
}

/**
 * takeLatest(types.LOGOUT, logoutFlow)
 */
export function* logoutFlow () {
  yield call(logoutEffect)
}

/**
 * takeLatest(types.RENEW_SESSION_REQUEST, renewSessionFlow)
 */
export function* renewSessionFlow () {
  const { token, expired_at, error } = yield call(renewSessionEffect)
  if (error) {
    yield put(actions.logout())
  } else {
    yield put(actions.renewSessionSuccess({ token, expired_at }))
  }
}

export default function* rootSaga () {
  yield [
    call(takeLatest, types.LOGIN_REQUEST, loginFlow),
    call(takeLatest, types.LOGOUT, logoutFlow),
    call(takeLatest, types.RENEW_SESSION_REQUEST, renewSessionFlow)
  ]
}
