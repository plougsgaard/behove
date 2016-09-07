import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'

export const wrapStringInText = (s) => (
  typeof s === 'string'
    ? <Text>{s}</Text>
    : s
)

const Base = React.createClass({
  render: function () {
    const { baseStyle, children } = this.props
    const { baseTheme } = this.context
    return (
      <Text style={{
        ...baseStyle
      }}>{children}</Text>
    )
  }
})

Base.propTypes = {
  children: PropTypes.any
}

Base.contextTypes = {
  baseTheme: PropTypes.object.isRequired
}

export default Base
