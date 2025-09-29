import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
}

export const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}
