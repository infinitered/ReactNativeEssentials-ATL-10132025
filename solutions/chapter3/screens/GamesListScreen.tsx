import React from 'react'
import { View, Text, FlatList } from 'react-native'

export const GamesListScreen = () => {
  const data = [{ id: 1, title: 'Sample Game' }]

  return (
    <View style={{ flex: 1 }}>
      <Text>Chapter 3: Meet the List - Coming Soon</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  )
}
