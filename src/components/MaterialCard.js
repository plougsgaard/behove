import React from 'react'
import { Image, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import styles from './MaterialCard.styles'

const noop = () => {}

const wrap = (s, style) =>
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
  children,
  style = {}
}) => (
  <View style={[styles.cardStyle, style]}>
    {imageSource && (
      <Image source={imageSource} style={styles.cardImageStyle} />
    )}
    {title && (
      <Text style={styles.cardTitleStyle}>{title}</Text>
    )}
    {wrap(children, styles.cardContentStyle)}
    {menuComponent && (
      <TouchableOpacity style={styles.cardMenuStyle} onPress={menuPress}>
        {wrap(menuComponent)}
      </TouchableOpacity>)}
    {actionComponent && (
      <TouchableOpacity style={styles.cardActionStyle} onPress={actionPress}>
        {wrap(typeof actionComponent === 'string' ? actionComponent.toUpperCase() : actionComponent, styles.cardActionTextStyle)}
      </TouchableOpacity>)}
  </View>
)

export const CardContainer = ({ children }) => (
  <ScrollView>
    <View style={styles.cardContainer}>{children}</View>
  </ScrollView>
)
