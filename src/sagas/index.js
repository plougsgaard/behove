import { takeEvery, delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import { watchLoginSubmit, watchLoginRequest } from './auth'

export function* helloSaga() {
  console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  // use the call Effect
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    helloSaga(),
    watchIncrementAsync(),
    watchLoginSubmit(),
    watchLoginRequest()
  ]
}
