import React from 'react'
import { Image, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import styles from './MaterialCard.styles'

const noop = () => {}

const wrap = (s, style = {}) =>
  typeof s === 'string'
    ? <Text style={style}>{s}</Text>
    : s

export const CardItem = ({
  imageSource,
  title,
  menuComponent,
  menuPress = noop,
  actionComponent,
  actionPress = noop,
  children
}) => (
  <View style={styles.cardStyle}>
    {imageSource && (
      <Image source={imageSource} style={styles.cardImageStyle}></Image>
    )}
    {title && (
      <Text style={styles.cardTitleStyle}>{title}</Text>
    )}
    <View>
      {wrap(children, styles.cardContentStyle)}
    </View>
    <TouchableOpacity style={styles.cardMenuStyle} onPress={menuPress}>
      {wrap(menuComponent)}
    </TouchableOpacity>
    <TouchableOpacity style={styles.cardActionStyle} onPress={actionPress}>
      {wrap(actionComponent)}
    </TouchableOpacity>
  </View>
)

export const CardContainer = ({ children }) => (
  <ScrollView>
    <View style={styles.cardContainer}>{children}</View>
  </ScrollView>
)
