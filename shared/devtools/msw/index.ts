import "react-native-url-polyfill/auto"

import { setupServer } from "msw/native"

import { game } from "./handlers/game"
import { games } from "./handlers/games"

/**
 * JSON mocks can be updated from IR's postman collection:
 * https://infinitered.postman.co/workspace/RN-Essentials~55d940f6-3d2e-4523-be26-b46db813a0ea/request/5586709-6c690fab-f460-40d6-8459-1ec5fc142fd4?ctx=documentation
 */

const server = setupServer(games, game)

export function setupMockServer(opts: { debug?: boolean } = {}) {
  console.log("🎭 MSW setupMockServer called with options:", opts)

  try {
    if (opts.debug) {
      console.log("🔍 Setting up MSW debug logging...")
      server.events.on("request:start", (req) => {
        console.log("🌐 MSW intercepted:", req.method, req.url)
      })
    }

    console.log("🚀 Starting MSW server...")
    server.listen({
      onUnhandledRequest: "bypass",
    })

    console.log("✅ MSW server started successfully!")
    console.log("📡 MSW handlers registered:", server.listHandlers().length)
  } catch (error) {
    console.error("❌ MSW setup error:", error)
  }
}
