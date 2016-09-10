import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, TextInput } from 'react-native'
import { Container, Content, InputGroup, Input, Icon } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { CardItem, CardContainer } from '../components/MaterialCard'
import { images, metrics } from '../theme'

import Heading from '../base/Heading'
import Flex from '../base/Flex'

import { RNEFormLabel, RNEFormInput } from '../arne'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import TextField from 'react-native-md-textinput'

const Refactored = ({ label, unit = 'g' }) => (
  <Flex flex={7} row style={{ borderBottomWidth: 1, borderColor: '#CCC' }}>
    <Flex flex={2} alignEnd justifyCenter  style={{ paddingRight: metrics.doubleBasePadding, height: 45 }}>{label}</Flex>
    <View style={{
      // backgroundColor: 'red',
      // height: 45,
      flex: 3,

    }}>
      <TextInput
        style={{
          height: 45,
          fontSize: 16,
          textAlign: 'center'
        }}
        autoCorrect={false}
        keyboardType={'numeric'}
        returnKeyType={'next'}
        placeholder=''/>
    </View>
    <Flex flex={1} justifyCenter style={{ paddingLeft: metrics.doubleBasePadding, height: 45 }}>
      {unit}
    </Flex>
    <Flex flex={1} justifyCenter style={{ paddingLeft: metrics.doubleBasePadding, height: 45 }}>
      <MaterialIcons name='keyboard-arrow-right' size={metrics.icons.medium} />
    </Flex>
  </Flex>
)

const ScanScene = ({ dispatch, auth }) => (
  <CardContainer>
    <CardItem>
      <Heading level={5} alignCenter>Nutrition</Heading>
      <Refactored label={'Calories'} unit={'kcal'} />
      <Refactored label={'Carbs'} />
      <Refactored label={'Sugar'} />
      <Refactored label={'Fat'} />
      <Refactored label={'Saturated'} />
      <Refactored label={'Salt'} unit='mg' />
    </CardItem>
  </CardContainer>
)

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(ScanScene)
