const baseColors = {
  black: '#111',
  white: '#fff',
  gray: '#ddd',
  midgray: '#888',
  blue: '#08e',
  red: '#f52',
  orange: '#f70',
  green: '#1c7'
}

const colors = {
  ...baseColors,
  primary: baseColors.blue,
  secondary: baseColors.midgray,
  default: baseColors.black,
  info: baseColors.blue,
  success: baseColors.green,
  warning: baseColors.orange,
  error: baseColors.red
}

const inverted = colors.white

const scale = [
  0,
  8,
  16,
  32,
  64
]

const fontSizes = [
  52,
  36,
  28,
  24,
  20,
  18,
  14
]

const padding = {
  noPadding: 0,
  smallPadding: 3,
  basePadding: 6,
  doubleBasePadding: 12,
  largePadding: 16,
  doubleLargePadding: 32
}

const boldSize = '600'
const borderRadius = 2
const borderColor = 'rgba(0, 0, 0, .25)'

const theme = {
  scale,
  fontSizes,
  boldSize,
  padding,
  colors,
  inverted,
  borderRadius,
  borderColor
}

export default theme
