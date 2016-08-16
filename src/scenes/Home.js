import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Button, Badge } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { CardItem, CardContainer } from '../components/MaterialCard'
import { images } from '../theme'

import { loginSubmit } from '../reducers/auth'

const onLogin = (payload, dispatch) => () => dispatch(loginSubmit(payload))

const Home = ({ dispatch, numbers }) => (
  <CardContainer>
    <CardItem
      imageSource={images.backgrounds.berries}
      actionComponent={'Go to settings'}
      actionPress={NavigationActions.settings}
      menuComponent={<Badge success>{numbers.counter}</Badge>}
      menuPress={() => dispatch({ type: 'INCREMENT_ASYNC' })}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...
    </CardItem>
    <CardItem>
      <Button rounded onPress={() => {
        const payload = { email: 'a@a.a', password: 'secret' }
        dispatch(loginSubmit(payload))
      }}>
        Call api
      </Button>
      <Button rounded onPress={onLogin({ email: 'a@a.a', password: 'secret' }, dispatch)}>
        Call api222
      </Button>
    </CardItem>
  </CardContainer>
)

const mapStateToProps = ({ numbers }) => ({ numbers })

export default connect(mapStateToProps)(Home)
