import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { View, Text } from 'react-native'

import baseTheme from './baseTheme'

class Base extends Component {
  constructor (props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render () {
    const { viewStyle, baseStyle, children } = this.props
    const { customTheme } = this.context

    const { colors } = { ...baseTheme, ...customTheme }

    return (
      <View style={{
        ...viewStyle
      }}>
        <Text style={{
          color: colors.default,
          ...baseStyle
        }}>{children}</Text>
      </View>
    )
  }
}

Base.propTypes = {
  children: PropTypes.any,
  baseStyle: PropTypes.object
}

Base.defaultProps = {
  flex: 1
}

Base.contextTypes = {
  customTheme: PropTypes.object.isRequired
}

export default Base
