import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'

import Base, { wrapStringInText } from './Base'

const Heading = ({ level, style, children, ...props }, { baseTheme }) => {
  const fontSize = 50 - level * 4
  return (
    <Base
      baseStyle={{
        ...style,
        fontSize
      }}
    >{wrapStringInText(children)}</Base>
  )
}

Heading.propTypes = {
  children: PropTypes.any,
  // similar to HTML headings
  level: PropTypes.oneOf([1, 2, 3, 4, 5])
}

Heading.contextTypes = {
  baseTheme: PropTypes.object.isRequired
}

export default Heading
