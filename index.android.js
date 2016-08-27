import React from 'react'
import { AppRegistry } from 'react-native'
import Root from './src/Root'
import configureStore from './src/redux/store'

const store = configureStore({
  development: (typeof __DEV__ !== 'undefined')
})

const PreRoot = () => (
  <Root store={store} />
)

AppRegistry.registerComponent('behove', () => PreRoot)
