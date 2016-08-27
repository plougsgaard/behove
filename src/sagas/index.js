import authSaga from './auth'

export default function* rootSaga () {
  yield [
    authSaga()
  ]
}
