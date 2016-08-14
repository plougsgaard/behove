import React, { PropTypes } from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import styles from './Root.styles.js'

export default ({ store }) => (
  <Provider store={store}>
    <View style={styles.applicationView}>
      <StatusBar
        barStyle='light-content'
      />
    </View>
  </Provider>
)
