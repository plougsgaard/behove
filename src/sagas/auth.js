import { postRequest, authenticatedPostRequest } from '../services/network'
import { takeLatest, delay } from 'redux-saga'
import { select, take, put, call, race } from 'redux-saga/effects'
import sha256 from 'crypto-js/sha256'
import _ from 'lodash'

import { types, actions } from '../reducers/auth'
import { selectors } from '../reducers'

export const makeDigest = ({ email, password }) => sha256(`${email}${password}`).toString()

//  ███████╗███████╗███████╗███████╗ ██████╗████████╗███████╗
//  ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝██╔════╝
//  █████╗  █████╗  █████╗  █████╗  ██║        ██║   ███████╗
//  ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║   ╚════██║
//  ███████╗██║     ██║     ███████╗╚██████╗   ██║   ███████║
//  ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝

export function* loginEffect({ email, password }) {
  const digest = makeDigest({ email, password })
  const url = 'auth/login'
  const body = {
    email,
    digest
  }
  try {
    const token = yield call(postRequest, url, body)
    return token
  } catch (error) {
    yield put(actions.loginError(error))
    return false
  }
}

export function* logoutEffect() {

}

export function* renewSessionEffect() {
  const url = 'users/renew'
  try {
    const token = yield select(selectors.auth.getToken)
    const request = authenticatedPostRequest(token)
    const { expired_at } = yield call(request, url)
    return { token, expired_at }
  } catch (error) {
    if (_.get(error, 'error.output.statusCode') === 401) {
      return error
    }
    return false
  }
}

//  ███████╗ █████╗  ██████╗  █████╗ ███████╗
//  ██╔════╝██╔══██╗██╔════╝ ██╔══██╗██╔════╝
//  ███████╗███████║██║  ███╗███████║███████╗
//  ╚════██║██╔══██║██║   ██║██╔══██║╚════██║
//  ███████║██║  ██║╚██████╔╝██║  ██║███████║
//  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

/**
 * Describes login flow.
 */
export function* loginFlow () {
  while (true) {
    const { payload } = yield take(types.LOGIN_REQUEST)
    // let everyone know we are waiting for something
    yield put(actions.loginRequestWaiting())
    // branch out to let `loginEffect` handle the messy network stuff
    // if we see a `types.LOGOUT` that takes priority
    const winner = yield race({
      login: call(loginEffect, payload),
      logout: take(types.LOGOUT)
    })
    // the wait is over
    yield put(actions.loginRequestDone())

    if (winner.login === false) {
      // loginEffect returned false due to wrong credentials or network/server error
      continue
    }
    if (winner.login) {
      // login won the race and was successful
      yield put(actions.loginSuccess(winner.login))
    } else if (winner.logout) {
      // we were interrupted by a `types.LOGOUT`
      yield call(logoutEffect)
    }
  }
}

/**
 * Describes logout flow.
 *
 * Listen for types.LOGOUT
 */
export function* logoutFlow () {
  // demonize
  while (true) {
    yield take(types.LOGOUT)
    yield call(logoutEffect)
  }
}

export function* renewSessionFlow () {
  const answer = yield call(renewSessionEffect)
  if (answer) {
    const { token, expired_at, error } = answer
    if (error) {
      yield put(actions.logout())
    } else {
      yield put(actions.renewSessionSuccess(answer))
    }
  } else {
    // we got an unexpected answer => no appropriate action
  }
}

export default function* rootSaga () {
  yield [
    loginFlow(),
    logoutFlow(),
    takeLatest(types.RENEW_SESSION_REQUEST, renewSessionFlow)
  ]
}
