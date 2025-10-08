import { Stack } from "expo-router"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { GlobalStateProvider } from "@services/state"
import { setupDevtools } from "@shared/devtools/setup"
import { useWebFonts } from "@shared/hooks/useWebFonts"
import { useAppTheme, useThemeProvider } from "@theme/index"

import { fonts } from "@/shared/theme/fonts"

if (__DEV__) {
  setupDevtools()
}

export default function RootLayout() {
  const { themeScheme, ThemeProvider } = useThemeProvider()
  const { loaded } = useWebFonts()
  if (!loaded) return null

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider value={{ themeScheme }}>
        <GlobalStateProvider>
          <ThemedStack />
        </GlobalStateProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

const ThemedStack = () => {
  const {
    theme: { colors, sizes },
  } = useAppTheme()
  return (
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
  )
}
ThemedStack.displayName = "ThemedStack"
