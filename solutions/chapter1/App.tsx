import React from 'react'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { GamesListScreen } from './screens/GamesListScreen'

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GamesListScreen />
    </SafeAreaProvider>
  )
}

export default App
