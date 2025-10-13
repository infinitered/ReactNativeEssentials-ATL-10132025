# Utilities

This document describes the utilities that are available in the project.

## MSW (Mock Service Worker)

MSW has been set up to provide API mocking for development. The setup includes:

- **Location**: `shared/devtools/msw/` directory
- **Handlers**: API handlers for games endpoints
- **Mock Data**: Sample games data in JSON format
- **Utilities**: Helper functions for data transformation

### Usage

MSW is automatically initialized in development mode when the app starts. It will intercept API calls to `https://api.rawg.io/api/games` and return mock data.

### Toggle MSW On/Off

You can easily toggle MSW on and off to demonstrate the difference between mock data and real API calls:

```bash
# Enable MSW (use mock data)
pnpm msw:on

# Disable MSW (use real RAWG.io API)
pnpm msw:off

# Check current MSW status
pnpm msw:status

# Toggle MSW (flip current state)
pnpm msw
```

**After toggling, reload your app** (press `r` in Metro) to see the changes take effect.

#### When MSW is ON (Enabled):

- API calls are intercepted and return mock data
- Console logs show: `🌐 Loading MSW...` and `🎭 MSW mock server setup complete!`
- Debug logs show: `🌐 MSW intercepted: GET https://api.rawg.io/api/games`
- Fast, consistent data - great for development and demos

#### When MSW is OFF (Disabled):

- API calls hit the real RAWG.io API
- No MSW logs appear in console
- Real, live data from the API
- Requires a valid API key in `shared/services/api.ts`

### Files Structure

```
shared/devtools/msw/
├── index.ts              # MSW server setup
├── handlers/
│   ├── games.ts          # Games list endpoint handler
│   └── game.ts           # Individual game endpoint handler
├── mocks/
│   └── games.json        # Mock games data
└── utils/
    ├── camelCaseKeys.ts  # Utility to convert snake_case to camelCase
    └── prepareGameData.ts # Data transformation utilities

scripts/
└── toggle-msw            # Script to enable/disable MSW
```

## Scripts

Several utility scripts have been added to help with development workflow:

### Available Scripts

- **`pnpm run clean`** - Clean all build artifacts and caches
- **`pnpm run setup`** - Run project setup (installs dependencies and runs postinstall)
- **`pnpm run skipTo <chapter>`** - Skip to a specific chapter (requires solutions directory)
- **`pnpm run verify-environment`** - Verify development environment setup
- **`pnpm run postinstall`** - Post-installation setup tasks
- **`pnpm msw`** - Toggle MSW on/off (flips current state)
- **`pnpm msw:on`** - Enable MSW (use mock data)
- **`pnpm msw:off`** - Disable MSW (use real API)
- **`pnpm msw:status`** - Check if MSW is currently enabled or disabled

### Chapter Navigation (skipTo)

The `skipTo` script allows you to jump to specific chapters during training:

```bash
# Skip to chapter 3
pnpm run skipTo 3
```

**Note**: This script requires a `solutions/` directory with chapter folders (e.g., `solutions/chapter1/`, `solutions/chapter2/`, etc.).

### Environment Verification

The `verify-environment` script checks that all required development tools are installed with correct versions:

- Ruby (3.0.0 - 3.3.0)
- Node.js (22.0.0+)
- Yarn (4.0.0+)
- Java (17.0.0+)
- Xcode Command Line Tools
- Android Debug Bridge (adb)

### Clean Script

The `clean` script removes all build artifacts and caches:

- iOS build directories and Pods
- Android build directories
- Node modules
- Yarn cache
- React Native and Metro caches
- Watchman watches

## Dependencies Added

- **msw**: Mock Service Worker for API mocking

## Integration

MSW is automatically integrated into the app and will start when running in development mode. The mock server will intercept API calls and return mock data, allowing you to develop without needing a real backend.

## Notes

- MSW only runs in development mode (`__DEV__`)
- MSW can be toggled on/off using the `toggle-msw` script for demonstrations
- The skipTo script has been adapted for the current project structure (uses `src/` instead of `app/`)
- All scripts are executable and ready to use
- Environment verification helps ensure consistent development setup across team members
- When MSW is disabled, ensure you have a valid RAWG.io API key configured in `shared/services/api.ts`
