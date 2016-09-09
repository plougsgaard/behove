import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import _ from 'lodash'

import Base from './Base'

import baseTheme from './baseTheme'

const Flex = ({
  flex,
  row,
  alignCenter,
  alignEnd,
  justifyCenter,
  justifyEnd,
  style,
  children,
  ...props
}, { customTheme }) => {
  const {
    padding: { basePadding }
  } = { ...baseTheme, ...customTheme }
  return (
    <Base
      viewStyle={{
        padding: basePadding,
        flex,
        flexDirection: row ? 'row' : 'column',
        alignItems: alignCenter ? 'center' : alignEnd ? 'flex-end' : 'flex-start',
        justifyContent: justifyCenter ? 'center' : justifyEnd ? 'flex-end' : 'flex-start',
        ...style
      }}
      children={children} />
  )
}

Flex.propTypes = {
  flex: PropTypes.number,
  // false => flexDirection: 'column'
  row: PropTypes.bool,
  // false => alignItems: 'flex-start'
  alignCenter: PropTypes.bool,
  // false => alignItems: 'flex-start'
  alignEnd: PropTypes.bool,
  // false => justifyContent: 'flex-start'
  justifyCenter: PropTypes.bool,
  // false => justifyContent: 'flex-start'
  justifyEnd: PropTypes.bool
}

Flex.defaultProps = {
  flex: 1,
  row: false
}

Flex.contextTypes = {
  customTheme: PropTypes.object.isRequired
}

export default Flex
