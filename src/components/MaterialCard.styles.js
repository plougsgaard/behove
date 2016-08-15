import { StyleSheet, Platform } from 'react-native'
import { colors } from '../theme'

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
    marginTop: Platform.OS === 'android' ? 56 : 0
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
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
    padding: 16,
    fontSize: 24,
    color: colors.snow,
    fontWeight: 'bold',
  },
  cardContentStyle: {
    padding: 15,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  cardActionStyle: {
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    padding: 15,
  },
  cardMenuStyle: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'transparent',
  }
})
