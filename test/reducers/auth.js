import test from 'ava'

import reducer, { types, actions } from '../../src/reducers/auth'

//   █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
//  ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
//  ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
//  ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
//  ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
//  ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

test('loginRequest action payload', (t) => {
  const payload = { email: 'a@a.a', password: 'secret' }
  const payloadInput = { ...payload }
  const payloadInputWithExtraKeys = { ...payload, age: 30 }
  t.deepEqual(
    actions.loginRequest(payload),
    { type: types.LOGIN_REQUEST, payload }
  )
  t.deepEqual(
    actions.loginRequest(payloadInputWithExtraKeys),
    { type: types.LOGIN_REQUEST, payload }
  )
})

test('loginSubmit action payload', (t) => {
  const payload = { email: 'a@a.a', password: 'secret' }
  const payloadInput = { ...payload }
  const payloadInputWithExtraKeys = { ...payload, age: 30 }
  t.deepEqual(
    actions.loginSubmit(payloadInput),
    { type: types.LOGIN_SUBMIT, payload }
  )
  t.deepEqual(
    actions.loginSubmit(payloadInputWithExtraKeys),
    { type: types.LOGIN_SUBMIT, payload }
  )
})

test('loginSuccess action payload', (t) => {
  const payload = { token: '1234' }
  const payloadInput = { ...payload }
  const payloadInputWithExtraKeys = { ...payload, password: 'foobar' }
  t.deepEqual(
    actions.loginSuccess(payloadInput),
    { type: types.LOGIN_SUCCESS, payload }
  )
  t.deepEqual(
    actions.loginSuccess(payloadInputWithExtraKeys),
    { type: types.LOGIN_SUCCESS, payload }
  )
})

test('loginError action payload has error', (t) => {
  const payloadInput = { message: 'something went wrong' }
  const payload = { ...payloadInput, error: true }
  t.deepEqual(
    actions.loginError(payloadInput),
    { type: types.LOGIN_ERROR, payload }
  )
})

//  ██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗███████╗██████╗
//  ██╔══██╗██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██████╔╝█████╗  ██║  ██║██║   ██║██║     █████╗  ██████╔╝
//  ██╔══██╗██╔══╝  ██║  ██║██║   ██║██║     ██╔══╝  ██╔══██╗
//  ██║  ██║███████╗██████╔╝╚██████╔╝╚██████╗███████╗██║  ██║
//  ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚══════╝╚═╝  ╚═╝

test('reducer has sane initial state', (t) => {
  const s = reducer()
  t.deepEqual(s, { token: null })
})
