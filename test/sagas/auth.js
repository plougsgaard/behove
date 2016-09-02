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

const errorUnauthorized = {
  error: 'Unauthorized',
  message: '(╯°□°）╯︵ ┻━┻',
  status: 401
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

  next = generator.next({ token: '123' })
  t.true(next.done)
})

test('loginEffect can fail with unauthorized', (t) => {
  const generator = loginEffect(credentials)

  let next = generator.next()
  t.deepEqual(next.value, call(postRequest, 'auth/login', body))

  next = generator.next({ error: errorUnauthorized })
  t.deepEqual(next.value, { error: errorUnauthorized })
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

  next = generator.next({ error: errorUnauthorized })
  t.deepEqual(next.value, { error: errorUnauthorized })
  t.true(next.done)
})

//  ███████╗ █████╗  ██████╗  █████╗ ███████╗
//  ██╔════╝██╔══██╗██╔════╝ ██╔══██╗██╔════╝
//  ███████╗███████║██║  ███╗███████║███████╗
//  ╚════██║██╔══██║██║   ██║██╔══██║╚════██║
//  ███████║██║  ██║╚██████╔╝██║  ██║███████║
//  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

/**
 * Test the loginFlow saga effect
 *
 * I've chosen this as the example on how to test generator functions.
 *
 * The general flow is like this. Each `next` advances the iterator
 * to the following `yield` clause. The subsequent `next` supplies our
 * own value to the entire `yield` clause and advances the iterator to
 * the next one.
 */
test('loginFlow succeeds', (t) => {
  // make an iterator from the generator function and supply it
  // with some arguments (clever way of packaging the 'payload')
  const generator = loginFlow(actions.loginRequest(credentials))

  // run the iterator to the first yield clause
  next = generator.next()
  // now the iterator is at the first yield clause which is a race
  t.deepEqual(next.value, race(loginRace))

  // supply outcome of the first yield clause (successful login)
  next = generator.next({ login: { token: 'abc' } })
  t.deepEqual(next.value, put(actions.loginRequestDone()))

  // the next yield (the `loginRequestDone` doesn't need a value
  next = generator.next()
  // the yielded value is the `loginSuccess` with the earlier arguments
  t.deepEqual(next.value, put(actions.loginSuccess({ token: 'abc' })))

  // advance the iterator past the last yield
  next = generator.next()
  // the function is done for now
  t.true(next.done)
})

test('loginFlow encounters unauthorized error', (t) => {
  const generator = loginFlow(actions.loginRequest(credentials))

  next = generator.next()
  t.deepEqual(next.value, race(loginRace))

  // supply outcome of the second yield clause (an erroneous login)
  const errorObject = { error: errorUnauthorized }
  next = generator.next({ login: errorObject })
  t.deepEqual(next.value, put(actions.loginRequestDone()))

  next = generator.next()
  t.deepEqual(next.value, put(actions.loginError(errorObject)))

  next = generator.next()
  t.true(next.done)
})

test('loginFlow is interrupted by logout', (t) => {
  const generator = loginFlow(actions.loginRequest(credentials))

  // the first yielded value is a race
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
