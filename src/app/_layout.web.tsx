import { useFonts } from "expo-font"
import { Stack } from "expo-router"

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "Oxanium-Regular": require("../../assets/fonts/Oxanium-Regular.ttf"),
    "Oxanium-Bold": require("../../assets/fonts/Oxanium-Bold.ttf"),
  })
  if (!loaded) {
    return null
  }
  return <Stack />
}
