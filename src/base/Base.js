import React, { PureComponent, PropTypes } from 'react'
import { View, Text } from 'react-native'

import baseTheme from './baseTheme'

class Base extends PureComponent {
  constructor (props, context) {
    super(props, context)
  }
  render () {
    const { viewStyle, textStyle, children } = this.props
    const { customTheme } = this.context
    const { colors } = { ...baseTheme, ...customTheme }

    const childComponent = typeof children !== 'string'
      ? children
      : (
        <Text style={{
          color: colors.default,
          ...textStyle
        }}>{children}</Text>
      )

    return (
      <View
        style={{
          ...viewStyle
        }}
        children={childComponent} />
    )
  }
}

Base.propTypes = {
  // string | Text
  children: PropTypes.any,
  // how to style strings turned into <Text/>
  textStyle: PropTypes.object
}

Base.defaultProps = {
  flex: 1
}

Base.contextTypes = {
  customTheme: PropTypes.object.isRequired
}

export default Base
