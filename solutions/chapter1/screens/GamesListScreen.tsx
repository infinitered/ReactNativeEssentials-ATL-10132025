import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const GamesListScreen = () => {
  const { bottom: paddingBottom, top: paddingTop } = useSafeAreaInsets()

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom, paddingTop }}
      style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text>Chapter 1: Visual Concepts - Coming Soon</Text>
        <Text>Games List Screen</Text>
      </View>
    </ScrollView>
  )
}
