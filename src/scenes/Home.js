import React from 'react'
import { connect } from 'react-redux'
import { Button, Badge } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { CardItem, CardContainer } from '../components/MaterialCard'
import { images, metrics } from '../theme'

import { actions as authActions } from '../reducers/auth'

const onLogin = (payload, dispatch) => () => dispatch(loginRequest(payload))

const HomeScene = ({ dispatch, numbers }) => (
  <CardContainer>
    <CardItem
      actionComponent={'Login'}
      actionPress={NavigationActions.settings}
    >
      You are currently in offline mode. That means no changes can be made.
      If you would like to do things, please login or sign up!
    </CardItem>
    <CardItem
      style={{ marginTop: metrics.baseMargin }}
      imageSource={images.backgrounds.noodles}
      actionComponent={'Go to settings'}
      actionPress={NavigationActions.settings}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...
    </CardItem>
  </CardContainer>
)

const mapStateToProps = ({ numbers }) => ({ numbers })

export default connect(mapStateToProps)(HomeScene)
