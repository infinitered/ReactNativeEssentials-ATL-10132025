import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GamesListScreen } from '../screens/GamesListScreen'
import { GameDetailsScreen } from '../screens/GameDetailsScreen'

const Stack = createNativeStackNavigator()

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GamesList" component={GamesListScreen} />
        <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
