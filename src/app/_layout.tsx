import { Stack } from "expo-router"

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
  
  // Setup MSW for API mocking in development
  const { setupMockServer } = require("../../msw/index.ts")
  setupMockServer({ debug: true })
}

export default function RootLayout() {
  return <Stack />
}
