import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import _ from 'lodash'

import Base, { wrapStringInText } from './Base'

import baseTheme from './baseTheme'

const Heading = ({
  level,
  alignCenter,
  style,
  children,
  ...props
}, { customTheme }) => {
  const {
    fontSizes,
    boldSize,
    padding: { basePadding }
  } = { ...baseTheme, ...customTheme }
  const fontSize = fontSizes[level]
  const alignItems = alignCenter ? 'center' : 'flex-start'
  return (
    <Base
      viewStyle={{
        alignItems,
        padding: basePadding
      }}
      textStyle={{
        ...style,
        fontSize,
        fontWeight: boldSize
      }}
      children={children} />
  )
}

Heading.propTypes = {
  children: PropTypes.any,
  // similar to HTML headings
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  // alignment within view
  alignCenter: PropTypes.bool
}

Heading.defaultProps = {
  level: 1,
  alignItems: 'flex-start',
  alignCenter: false
}

Heading.contextTypes = {
  customTheme: PropTypes.object.isRequired
}

export default Heading
