import { Stack } from "expo-router"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { setupDevtools } from "../../shared/devtools/setup"
import { useWebFonts } from "../../shared/hooks/useWebFonts"

export default function RootLayout() {
  if (__DEV__) {
    setupDevtools()
  }

  const { loaded } = useWebFonts()
  if (!loaded) return null

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  )
}
