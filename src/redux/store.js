import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger()

let middleware = []

if (__DEV__) {
  middleware.push(logger)
}

export default () => {

  const enhancers = compose(
    applyMiddleware(...middleware)
  )

  return createStore(
    rootReducer,
    enhancers
  )
}
