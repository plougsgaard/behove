import React, { PropTypes } from 'react'
import { AppRegistry } from 'react-native'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import styles from './Root.styles.js'

import NavigationRouter from './navigation/NavigationRouter'

const store = configureStore({
  development: (typeof __DEV__ !== 'undefined')
})

const Root = React.createClass({
  displayName: 'Root',
  getChildContext: function () {
    return {
      baseTheme: {
        color: {
          danger: '#FF0000',
          success: '#2FFF01',
        }
      }
    }
  },
  childContextTypes: {
    baseTheme: PropTypes.object.isRequired
  },
  render: function () {
    return (
      <Provider store={store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />
          <NavigationRouter />
        </View>
      </Provider>
    )
  }
})

module.exports = () => AppRegistry.registerComponent('behove', () => Root)
