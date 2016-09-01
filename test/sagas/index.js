import test from 'ava'

require('isomorphic-fetch')

import createSagaMiddleware, { delay, END } from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import _ from 'lodash'

import authSaga from '../../src/sagas/auth'
import rootSaga from '../../src/sagas'
import rootReducer, { selectors } from '../../src/reducers'

import { types as authTypes, actions as authActions } from '../../src/reducers/auth'

// saga middleware
const sagaMiddleware = createSagaMiddleware()

// test input
const email = 'a@a.a'
const password = 'secret'
const credentials = { email, password }

test('real loginRequest yields a token', async (t) => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  const p = sagaMiddleware.run(rootSaga).done
  store.dispatch(authActions.loginRequest(credentials))
  store.dispatch(END)
  await p
  t.truthy(selectors.auth.getToken(store.getState()))
})
