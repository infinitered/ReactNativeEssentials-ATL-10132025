# Utilities Migration

This document describes the utilities that have been migrated from the previous training repository.

## MSW (Mock Service Worker)

MSW has been set up to provide API mocking for development. The setup includes:

- **Location**: `/msw/` directory
- **Handlers**: API handlers for games endpoints
- **Mock Data**: Sample games data in JSON format
- **Utilities**: Helper functions for data transformation

### Usage

MSW is automatically initialized in development mode when the app starts. It will intercept API calls to `https://api.retrogames.dev/games` and return mock data.

### Files Structure

```
msw/
├── index.ts              # MSW server setup
├── handlers/
│   ├── games.ts          # Games list endpoint handler
│   └── game.ts           # Individual game endpoint handler
├── mocks/
│   └── games.json        # Mock games data
└── utils/
    ├── camelCaseKeys.ts  # Utility to convert snake_case to camelCase
    ├── delay.ts          # Utility for adding delays to responses
    └── prepareGameData.ts # Data transformation utilities
```

## Scripts

Several utility scripts have been migrated to help with development workflow:

### Available Scripts

- **`npm run clean`** - Clean all build artifacts and caches
- **`npm run setup`** - Run project setup (installs dependencies and runs postinstall)
- **`npm run skipTo <chapter>`** - Skip to a specific chapter (requires solutions directory)
- **`npm run verify-environment`** - Verify development environment setup
- **`npm run postinstall`** - Post-installation setup tasks

### Chapter Navigation (skipTo)

The `skipTo` script allows you to jump to specific chapters during training:

```bash
# Skip to chapter 3
npm run skipTo 3
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
- The skipTo script has been adapted for the current project structure (uses `src/` instead of `app/`)
- All scripts are executable and ready to use
- Environment verification helps ensure consistent development setup across team members
