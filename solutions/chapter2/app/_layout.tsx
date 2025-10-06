import { Stack } from "expo-router"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { useWebFonts } from "@shared/hooks/useWebFonts"

export default function RootLayout() {
  const { loaded } = useWebFonts()
  if (!loaded) return null
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  )
}
