import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Button, Badge } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { CardItem, CardContainer } from '../components/MaterialCard'
import { images } from '../theme'

import { incrementAsync } from '../sagas'

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
  </CardContainer>
)

const mapStateToProps = ({ numbers }) => ({ numbers })

export default connect(mapStateToProps)(Home)
