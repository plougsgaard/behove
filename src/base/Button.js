import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'

import Base from './Base'

const Button = React.createClass({
  contextTypes: {
    customTheme: PropTypes.object.isRequired
  },
  render: function () {
    const { children } = this.props
    return (
      <Base
        children={children}/>
    )
  }
})

Button.propTypes = {
  children: PropTypes.any
}

Button.contextTypes = {
  customTheme: PropTypes.object.isRequired
}

export default Button
