import React from 'react'
import { TouchableOpacity, Text, ViewStyle } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
}

export const Button = ({ title, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}
