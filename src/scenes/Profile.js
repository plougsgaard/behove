import React from 'react'
import { connect } from 'react-redux'
import { Button, Badge } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { CardItem, CardContainer } from '../components/MaterialCard'
import { images, metrics } from '../theme'

const ProfileScene = ({ dispatch, auth }) => (
  <CardContainer>
    <CardItem
      imageSource={images.backgrounds.berries}
      actionComponent={'Go home'}
      actionPress={NavigationActions.home}
    >
      Uh this is a profile mind you.
    </CardItem>
    <CardItem
      style={{ marginTop: metrics.baseMargin }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...
    </CardItem>
  </CardContainer>
)

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(ProfileScene)
