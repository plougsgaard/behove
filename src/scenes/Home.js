import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Button, Badge } from 'native-base'

import { incrementAsync } from '../sagas'

const Home = ({ dispatch, numbers }) => (
  <Container>
      <Content>
          <Badge primary>{numbers.counter}</Badge>
          <Button rounded onPress={() => dispatch({ type: 'INCREMENT_ASYNC' })}> Primary </Button>
          <Button rounded success> Success </Button>
          <Button rounded info> Info </Button>
          <Button rounded warning> Warning </Button>
          <Button rounded danger> Danger </Button>
      </Content>
  </Container>
)

const mapStateToProps = ({ numbers }) => ({ numbers })

export default connect(mapStateToProps)(Home)
