import React from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import styles from './MenuButton.styles.js'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { colors, metrics } from '../theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

const PlatformIcon = Platform.select({
  ios: () => (
    <Ionicons name='ios-menu'
      size={metrics.icons.medium}
      color={colors.snow}
    />
  ),
  android: () => (
    <MaterialIcons name='menu'
      size={metrics.icons.medium}
      color={colors.snow}
    />
  )
})

export default () => (
  <TouchableOpacity onPress={openDrawer} style={styles.navButtonLeft}>
    <PlatformIcon />
  </TouchableOpacity>
)
