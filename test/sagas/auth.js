import test from 'ava'

import { take, put, race } from 'redux-saga/effects'

import { types, actions } from '../../src/reducers/auth'
import { loginFlow } from '../../src/sagas/auth'

const credentials = { email: 'a@a.a', password: 'secret' }
const serverResponse = { token: '1234' }
const submitRace = {
  success: take(types.LOGIN_SUCCESS),
  error: take(types.LOGIN_ERROR)
}
const submitWinner = {
  success: take(types.LOGIN_SUCCESS)
}

test.skip('loginFlow flow', (t) => {
  const generator = loginFlow()

  let next = generator.next(actions.loginSubmit(credentials))
  t.deepEqual(next.value, take(types.LOGIN_SUBMIT))
  t.is(next.done, false, 'not done')

  next = generator.next(actions.loginRequest(credentials))
  t.deepEqual(next.value, put(actions.loginRequest(credentials)))
  t.is(next.done, false)

  // TODO things are a bit fuzzy from here..

  next = generator.next({ data: credentials })
  t.deepEqual(next.value, race(submitRace))
  t.is(next.done, false)

  next = generator.next(submitWinner)
  t.deepEqual(next.value, take(types.LOGIN_SUCCESS))
  t.is(next.done, false)
})
