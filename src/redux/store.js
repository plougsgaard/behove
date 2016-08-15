import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

let middleware = [
  sagaMiddleware
]

if (__DEV__) {
  middleware.push(createLogger())
}

export default () => {

  const enhancers = compose(
    applyMiddleware(...middleware)
  )

  const store = createStore(
    rootReducer,
    enhancers
  )

  sagaMiddleware.run(rootSaga)

  return store
}
