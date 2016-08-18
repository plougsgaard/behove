import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

/**
 * Metrics are constants used for visual elements throughout.
 * @type {Object}
 */
export const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  smallMargin: 5,
  baseMargin: 10,
  doubleBaseMargin: 20,
  basePadding: 8,
  doubleBasePadding: 16,
  horizontalLineHeight: 1,
  screenWidth: Math.min(width, height),
  screenHeight: Math.max(width, height),
  navBarHeight: Platform.select({ ios: 64, android: 54 }),
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  }
}

/**
 * Named (hence themeable) colors
 * @type {Object}
 */
export const colors = {
  background: '#3498db',
  frost: '#D8D8D8',
  snow: '#FFFFFF',
  panther: '#161616',
  charcoal: '#595959',
  coal: '#2d2d2d'
}

/**
 * Images ready to be served by `source`.
 * Are inlined into the bundle (use `require`).
 * @type {Object}
 */
export const images = {
  backgrounds: {
    berries: require('../../img/berries.jpg')
  }
}
