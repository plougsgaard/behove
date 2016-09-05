import { Platform, StyleSheet } from 'react-native'
import { metrics } from '../theme'

export default StyleSheet.create({
  navButtonLeft: Platform.select({
    ios: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginTop: metrics.baseMargin / 2,
      marginLeft: metrics.baseMargin,
      width: metrics.icons.medium
    },
    android: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      margin: metrics.baseMargin,
      width: metrics.icons.medium
    }
  })
})
