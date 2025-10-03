import { Stack, useLocalSearchParams } from 'expo-router'

import { GameDetailsScreen } from '../screens/GameDetailsScreen'

export default function GameDetailsRoute() {
  const params = useLocalSearchParams<{ gameId?: string; name?: string }>()

  const gameId = Number(params.gameId)

  return (
    <>
      <Stack.Screen
        options={{
          title: params.name ?? 'Game Details',
        }}
      />
      <GameDetailsScreen gameId={Number.isNaN(gameId) ? undefined : gameId} />
    </>
  )
}
