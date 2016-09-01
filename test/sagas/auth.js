import test from 'ava'
import { select, take, put, race, call } from 'redux-saga/effects'
import _ from 'lodash'

import { selectors } from '../../src/reducers'
import { types, actions } from '../../src/reducers/auth'
import rootSaga, { loginEffect, renewSessionEffect, logoutEffect, loginFlow, makeDigest } from '../../src/sagas/auth'
import { postRequest, authenticatedPostRequest } from '../../src/services/network'

const email = 'a@a.a'
const password = 'secret'
const digest = makeDigest({ email, password })
const credentials = { email, password }
const body = { email, digest }
const loginRace = {
  login: call(loginEffect, credentials),
  logout: take(types.LOGOUT)
}

//  ███████╗███████╗███████╗███████╗ ██████╗████████╗███████╗
//  ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝██╔════╝
//  █████╗  █████╗  █████╗  █████╗  ██║        ██║   ███████╗
//  ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║   ╚════██║
//  ███████╗██║     ██║     ███████╗╚██████╗   ██║   ███████║
//  ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝

test('loginEffect can succeed', (t) => {
  const generator = loginEffect(credentials)

  let next = generator.next()
  t.deepEqual(next.value, call(postRequest, 'auth/login', body))

  next = generator.next()
  t.true(next.done)
})

test('loginEffect can fail with unauthorized', (t) => {
  const generator = loginEffect(credentials)

  let next = generator.next()
  t.deepEqual(next.value, call(postRequest, 'auth/login', body))

  const authError = { error: { output: { statusCode: 401 } } }

  next = generator.throw(authError)
  t.deepEqual(next.value, authError)
  t.true(next.done)
})

test('loginEffect can fail with unknown error', (t) => {
  const generator = loginEffect(credentials)

  let next = generator.next()
  t.deepEqual(next.value, call(postRequest, 'auth/login', body))

  const authError = { error: { output: { statusCode: 404 } } }

  next = generator.throw(authError)
  t.false(next.value)
  t.true(next.done)
})

test('renewSessionEffect can succeed', (t) => {
  const generator = renewSessionEffect()

  let next = generator.next()
  t.deepEqual(next.value, select(selectors.auth.getToken))

  const token = 'abc'
  next = generator.next(token)
  t.deepEqual(next.value, call(authenticatedPostRequest, token))

  const request = authenticatedPostRequest(token)
  next = generator.next(request)
  t.deepEqual(next.value, call(request, 'users/renew'))

  const result = { token, expired_at: 1472756086596 }
  next = generator.next(result)
  t.deepEqual(next.value, result)
  t.true(next.done)
})

test('renewSessionEffect can fail with unauthorized', (t) => {
  const generator = renewSessionEffect()

  let next = generator.next()
  t.deepEqual(next.value, select(selectors.auth.getToken))

  const token = 'some_unauthed_token'
  next = generator.next(token)
  t.deepEqual(next.value, call(authenticatedPostRequest, token))

  const request = authenticatedPostRequest(token)
  next = generator.next(request)
  t.deepEqual(next.value, call(request, 'users/renew'))

  const authError = { error: { output: { statusCode: 401 } } }

  next = generator.throw(authError)
  t.deepEqual(next.value, authError)
  t.true(next.done)
})

test('renewSessionEffect can fail with unknown error', (t) => {
  const generator = renewSessionEffect()

  let next = generator.next()
  t.deepEqual(next.value, select(selectors.auth.getToken))

  const token = 'some_unauthed_token'
  next = generator.next(token)
  t.deepEqual(next.value, call(authenticatedPostRequest, token))

  const request = authenticatedPostRequest(token)
  next = generator.next(request)
  t.deepEqual(next.value, call(request, 'users/renew'))

  const authError = { error: { output: { statusCode: 404 } } }

  next = generator.throw(authError)
  t.false(next.value)
  t.true(next.done)
})

//  ███████╗ █████╗  ██████╗  █████╗ ███████╗
//  ██╔════╝██╔══██╗██╔════╝ ██╔══██╗██╔════╝
//  ███████╗███████║██║  ███╗███████║███████╗
//  ╚════██║██╔══██║██║   ██║██╔══██║╚════██║
//  ███████║██║  ██║╚██████╔╝██║  ██║███████║
//  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

test('loginFlow succeeds', (t) => {
  const generator = loginFlow(actions.loginRequest(credentials))

  // start generator, run till first yield, give yielded value back
  // the value is this cause it says so in the code
  let next = generator.next()
  t.deepEqual(next.value, put(actions.loginRequestWaiting()))

  // the next yielded value is a race
  next = generator.next()
  t.deepEqual(next.value, race(loginRace))

  // pass the winner of the race to the second third expression
  // also remember `next.value.login` since we'll need it shortly
  next = generator.next(_.pick(loginRace, 'login'))
  const loginSuccessValue = next.value.login
  t.deepEqual(next.value, put(actions.loginRequestDone()))

  // here's where we need that `next.value.login` from earlier
  next = generator.next()
  t.deepEqual(next.value, put(actions.loginSuccess(loginSuccessValue)))

  // and we're done
  next = generator.next()
  t.true(next.done)
})

test.todo('loginFlow encounters server error')

test('loginFlow is interrupted by logout', (t) => {
  const generator = loginFlow(actions.loginRequest(credentials))

  // start generator, run till first yield, give yielded value back
  // the value is this cause it says so in the code
  let next = generator.next()
  t.deepEqual(next.value, put(actions.loginRequestWaiting()))

  // the next yielded value is a race
  next = generator.next()
  t.deepEqual(next.value, race(loginRace))

  // pass the winner of the race to the second yield expression
  next = generator.next(_.pick(loginRace, 'logout'))
  t.deepEqual(next.value, put(actions.loginRequestDone()))

  next = generator.next()
  t.deepEqual(next.value, call(logoutEffect))

  // and we're done
  next = generator.next()
  t.true(next.done)
})

test.todo('logoutFlow works')
