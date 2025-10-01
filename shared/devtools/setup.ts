import { Platform } from "react-native"

/**
 * Unified development tools setup
 * This function sets up all development tools (Reactotron, MSW, etc.)
 * and can be called from both mobile and web layout files
 */
export const setupDevtools = () => {
  if (!__DEV__) {
    return
  }

  console.log("🔧 DEV MODE: Setting up development tools...")
  console.log("📱 Platform:", Platform.OS)

  // Setup Reactotron
  try {
    console.log("📱 Loading Reactotron...")
    require("./reactotron/ReactotronConfig.ts")
    console.log("✅ Reactotron loaded successfully!")
  } catch (error) {
    console.error("❌ Reactotron setup failed:", error)
  }

  // Setup MSW (Mock Service Worker)
  try {
    console.log("🌐 Loading MSW...")
    const { setupMockServer } = require("./msw/index.ts")
    console.log("✅ MSW loaded successfully, setting up mock server...")
    setupMockServer({ debug: true })
    console.log("🎭 MSW mock server setup complete!")
  } catch (error) {
    console.error("❌ MSW setup failed:", error)
  }

  console.log("🚀 All development tools setup complete!")
}
