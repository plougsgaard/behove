import React from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './BackButton.styles.js'

import { colors, metrics } from '../theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PlatformIcon = Platform.select({
  ios: () => (
    <Ionicons name='ios-arrow-back'
      size={metrics.icons.medium}
      color={colors.snow}
    />
  ),
  android: () => (
    <MaterialIcons name='arrow-back'
      size={metrics.icons.medium}
      color={colors.snow}
    />
  )
})

export default () => (
  <TouchableOpacity onPress={NavigationActions.pop} style={styles.navButtonLeft}>
    <PlatformIcon />
  </TouchableOpacity>
)
