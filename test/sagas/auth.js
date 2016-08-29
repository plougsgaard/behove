import test from 'ava'
import { take, put, race, call } from 'redux-saga/effects'
import _ from 'lodash'

import { types, actions } from '../../src/reducers/auth'
import { loginEffect, logoutEffect, loginFlow, makeDigest } from '../../src/sagas/auth'
import { httpRequest } from '../../src/services/network'

const email = 'a@a.a'
const password = 'secret'
const digest = makeDigest({ email, password })
const credentials = { email, password }
const options = {
  method: 'post',
  body: {
    email,
    digest
  }
}
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
  t.deepEqual(next.value, call(httpRequest, 'auth/login', options))

  next = generator.next()
  t.true(next.done)
})

test('loginEffect can fail', (t) => {
  const generator = loginEffect(credentials)

  let next = generator.next()
  t.deepEqual(next.value, call(httpRequest, 'auth/login', options))

  next = generator.throw('error')
  t.deepEqual(next.value, put(actions.loginError('error')))

  next = generator.next()
  t.false(next.value)
  t.true(next.done)
})

test.todo('loginEffect can be interrupted by logout')

//  ███████╗ █████╗  ██████╗  █████╗ ███████╗
//  ██╔════╝██╔══██╗██╔════╝ ██╔══██╗██╔════╝
//  ███████╗███████║██║  ███╗███████║███████╗
//  ╚════██║██╔══██║██║   ██║██╔══██║╚════██║
//  ███████║██║  ██║╚██████╔╝██║  ██║███████║
//  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

test('loginFlow succeeds', (t) => {
  const generator = loginFlow()

  // start generator, run till first yield, give yielded value back
  // the value is this cause it says so in the code
  let next = generator.next()
  t.deepEqual(next.value, take(types.LOGIN_REQUEST))

  // pass in the value to the first yield expression
  next = generator.next(actions.loginRequest(credentials))
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

  // and the loop continues from the beginning
  next = generator.next()
  t.deepEqual(next.value, take(types.LOGIN_REQUEST))
})

test.todo('loginFlow encounters server error')

test('loginFlow is interrupted by logout', (t) => {
  const generator = loginFlow()

  // start generator, run till first yield, give yielded value back
  // the value is this cause it says so in the code
  let next = generator.next()
  t.deepEqual(next.value, take(types.LOGIN_REQUEST))

  // pass in the value to the first yield expression
  next = generator.next(actions.loginRequest(credentials))
  t.deepEqual(next.value, put(actions.loginRequestWaiting()))

  // the next yielded value is a race
  next = generator.next()
  t.deepEqual(next.value, race(loginRace))

  // pass the winner of the race to the second yield expression
  next = generator.next(_.pick(loginRace, 'logout'))
  t.deepEqual(next.value, put(actions.loginRequestDone()))

  next = generator.next()
  t.deepEqual(next.value, call(logoutEffect))

  // and the loop continues from the beginning
  next = generator.next()
  t.deepEqual(next.value, take(types.LOGIN_REQUEST))
})

test.todo('logoutFlow works')
