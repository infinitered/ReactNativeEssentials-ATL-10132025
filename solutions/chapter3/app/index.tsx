import { Stack } from "expo-router"

import { GamesListScreen } from "@/screens/GamesListScreen"

export default function GamesListRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Retro Games" }} />
      <GamesListScreen />
    </>
  )
}
