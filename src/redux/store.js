import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export default ({ development = false }) => {
  const middleware = [
    sagaMiddleware,
    development && createLogger()
  ]

  const enhancers = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  const store = createStore(
    rootReducer,
    enhancers
  )

  sagaMiddleware.run(rootSaga)

  return store
}
