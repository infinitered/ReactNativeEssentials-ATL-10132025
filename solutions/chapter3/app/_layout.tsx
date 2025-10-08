import { Stack } from "expo-router"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { setupDevtools } from "../../shared/devtools/setup"
import { useWebFonts } from "../../shared/hooks/useWebFonts"
import { colors, fonts, sizes } from "@/theme/index"
import { GlobalStateProvider } from "../services/state"

export default function RootLayout() {
  if (__DEV__) {
    setupDevtools()
  }

  const { loaded } = useWebFonts()
  if (!loaded) return null

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GlobalStateProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: colors.background.primary,
              borderTopColor: colors.border.base,
              borderTopWidth: sizes.border.sm,
            },
            headerStyle: {
              backgroundColor: colors.background.brand,
            },
            headerTintColor: colors.text.base,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: fonts.primary.semiBold,
            },
            headerShadowVisible: false,
          }}
        />
      </GlobalStateProvider>
    </SafeAreaProvider>
  )
}
