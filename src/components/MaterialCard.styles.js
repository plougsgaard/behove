import { StyleSheet, Platform } from 'react-native'
import { colors, metrics } from '../theme'

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: metrics.doubleBasePadding,
    marginTop: Platform.OS === 'android' ? 56 : 0
  },
  cardStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2
    }
  },
  cardImageStyle: {
    flex: 1,
    height: 170,
    resizeMode: 'cover',
    width: null
  },
  cardTitleStyle: {
    position: 'absolute',
    top: 120,
    left: 26,
    backgroundColor: 'transparent',
    padding: metrics.doubleBasePadding,
    fontSize: 24,
    color: colors.snow,
    fontWeight: 'bold'
  },
  cardContentStyle: {
    padding: 15,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  cardActionStyle: {
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    padding: 15
  },
  cardActionTextStyle: {
    color: colors.link,
    fontWeight: '600'
  },
  cardMenuStyle: {
    position: 'absolute',
    top: metrics.doubleBasePadding,
    right: metrics.doubleBasePadding,
    backgroundColor: 'transparent'
  }
})
