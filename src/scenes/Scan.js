import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, TextInput } from 'react-native'
import { Container, Content, InputGroup, Input, Icon } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { CardItem, CardContainer } from '../components/MaterialCard'
import { images, metrics } from '../theme'

import Heading from '../base/Heading'

const MyInputPleaseRenameMe = ({ label, unit = 'g' }) => (
  <View style={{ flex: 4, flexDirection: 'row', padding: metrics.baseMargin }}>
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        // backgroundColor: '#eee',
        paddingRight: metrics.baseMargin
      }}>
      <Text
        style={{
          height: 26,
          flex: 1,
          fontSize: 13,
          padding: metrics.baseMargin / 2
        }}>{label}</Text>
    </View>
    <View
      style={{
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
      <TextInput
        style={{
          height: 26,
          flex: 1,
          fontSize: 14,
          padding: metrics.baseMargin / 2
        }}
        autoCorrect={false}
        keyboardType={'numeric'}
        returnKeyType={'next'}
        placeholder='Icon Textbox'/>
    </View>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Text
        style={{
          height: 26,
          flex: 1,
          fontSize: 13,
          color: '#aaa',
          padding: metrics.baseMargin / 2
        }}>{unit}</Text>
    </View>
  </View>
)

const ScanScene = ({ dispatch, auth }) => (
  <CardContainer>
    <CardItem>
      <Heading level={1} alignCenter>Heading</Heading>
      <Heading level={2}>Heading</Heading>
      <Heading level={3} alignCenter>Heading</Heading>
      <Heading level={4}>Heading</Heading>
      <Heading level={5}>Heading</Heading>
      <MyInputPleaseRenameMe label={'Calories'} unit='kcal' />
      <MyInputPleaseRenameMe label={'Carbs'} />
      <MyInputPleaseRenameMe label={'Sugar'} />
      <MyInputPleaseRenameMe label={'Fat'} />
      <MyInputPleaseRenameMe label={'Saturated'} />
      <MyInputPleaseRenameMe label={'Salt'} unit='mg' />
    </CardItem>
  </CardContainer>
)

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(ScanScene)
