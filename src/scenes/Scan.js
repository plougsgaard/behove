import React from 'react'
import { connect } from 'react-redux'
import { Button, Badge } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { CardItem, CardContainer } from '../components/MaterialCard'
import { images, metrics } from '../theme'

const ScanScene = ({ dispatch, auth }) => (
  <CardContainer>
    <CardItem>
      Placeholder for scan page.
    </CardItem>
  </CardContainer>
)

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(ScanScene)
