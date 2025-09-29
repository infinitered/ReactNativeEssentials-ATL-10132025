import { Stack } from "expo-router"

import { setupDevtools } from "../devtools/setup"

if (__DEV__) {
  setupDevtools()
}

export default function RootLayout() {
  return <Stack />
}
