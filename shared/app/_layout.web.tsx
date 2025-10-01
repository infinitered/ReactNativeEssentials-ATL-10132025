import { useFonts } from "expo-font"
import { Stack } from "expo-router"

import { setupDevtools } from "../devtools/setup"

if (__DEV__) {
  setupDevtools()
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "Oxanium-Regular": require("../../assets/fonts/Oxanium-Regular.ttf"),
    "Oxanium-Bold": require("../../assets/fonts/Oxanium-Bold.ttf"),
    "Oxanium-Medium": require("../../assets/fonts/Oxanium-Medium.ttf"),
    "Oxanium-SemiBold": require("../../assets/fonts/Oxanium-SemiBold.ttf"),
  })
  if (!loaded) {
    return null
  }
  return <Stack />
}
