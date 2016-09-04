import React from 'react'
import { connect } from 'react-redux'
import { Button, Badge } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { CardItem, CardContainer } from '../components/MaterialCard'
import { images, metrics } from '../theme'

import { actions as authActions } from '../reducers/auth'

const onLogin = (payload, dispatch) => () => dispatch(authActions.loginRequest(payload))

const HomeScene = ({ dispatch, auth }) => (
  <CardContainer>
    {auth.token === null && (
      <CardItem
        actionComponent={'Login'}
        actionPress={onLogin({ email: 'a@a.a', password: 'secret' }, dispatch)}
      >
        You are currently in offline mode. That means no changes can be made.
        If you would like to do things, please login or sign up!
      </CardItem>
    )}
    <CardItem
      style={{ marginTop: metrics.baseMargin }}
      imageSource={images.backgrounds.noodles}
      actionComponent={'Scan'}
      actionPress={NavigationActions.scan}
    >
      Is your mouth tiny and small? Get on down to scanning some food. Lil bits!
    </CardItem>
    {auth.token !== null && (
      <CardItem
        style={{ marginTop: metrics.baseMargin }}
      >
        Placeholder for list of items added.
      </CardItem>
    )}
  </CardContainer>
)

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(HomeScene)
