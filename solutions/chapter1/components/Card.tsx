import React from 'react'
import { View, Text, ViewStyle } from 'react-native'

interface CardProps {
  title: string
  children?: React.ReactNode
  style?: ViewStyle
}

export const Card = ({ title, children, style }: CardProps) => {
  return (
    <View style={style}>
      <Text>{title}</Text>
      {children}
    </View>
  )
}
