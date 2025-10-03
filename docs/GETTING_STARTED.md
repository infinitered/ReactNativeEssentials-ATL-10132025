# React Native Essentials — Getting Started (Ignite + Expo Router)

This guide walks you through creating a fresh Ignite + Expo Router app and running it on Android, iOS, and Web using pnpm. It includes required tooling, quick commands, a verification checklist, and common troubleshooting steps.

## Quick commands (create + run)

Create a new project:

```bash
npx ignite-cli@latest new TestApp --yes --experimental=expo-router --packager=pnpm
```

Change into the project and run targets:

```bash
cd TestApp
pnpm run android   # build & install to Android emulator
pnpm run ios       # macOS only — build & run in Simulator
pnpm run web       # open in browser
```

If a target device/simulator isn’t running the CLI will usually try to boot it, but it’s faster to start the emulator/simulator first.

---

## 1) Required tooling (verify before the workshop)

Install and verify these before you begin. Builds are much faster when the SDKs are already installed.

- Node.js: >= 20.19.5 (Node 20)
  - Verify: `node -v` (expected: v20.19.5 or greater)
- pnpm: v8+ (v9 recommended)
  - Install: `npm i -g pnpm`
  - Verify: `pnpm -v`
- Git
  - Verify: `git --version`

### iOS Specific

- Xcode (16.3+) with Command Line Tools
  - Open Xcode → Preferences → Locations → Command Line Tools: select the current Xcode
- CocoaPods
  - Install: `sudo gem install cocoapods` (or `brew install cocoapods`)
  - Verify: `pod --version`

### Android Specific

- Android Studio with:
  - SDK Platform: Android 14 or 15 (API 34/35)
  - Android SDK Build-Tools (latest)
  - Android Emulator
  - Android SDK Platform-Tools (adb)
  - Create at least one virtual device (e.g., Pixel 7, API 34/35)
- Java 17 (JDK 17)
  - Verify: `java -version` shows 17.x

Example environment variables (macOS):

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$PATH"
```

---

## 2) Verify a fresh project

After creating the project, verify each platform:

- Android: `pnpm run android` — Metro should start, Gradle build should succeed, and the app should install to the emulator.
- iOS (macOS): `pnpm run ios` — Metro starts and Xcode builds the app into the Simulator.
- Web: `pnpm run web` — Dev server starts and opens the app in your browser.

Quick checklist

- [ ] Android: app installs and shows the initial Ignite screen
- [ ] iOS: builds and launches in Simulator without red boxes
- [ ] Web: opens and renders in a browser tab

---

## 3) Common troubleshooting (Expo CNG & native builds)

Expo CNG generates native projects from your app config. If a native build fails or things look out-of-sync, try these steps.

### General fixes

```bash
# remove and reinstall dependencies
rm -rf node_modules/ android/ ios/
pnpm install
# start Metro with a cleared cache
pnpm start -- --clear
```

### Port conflicts

Metro defaults to 8081. If another process uses that port, start Metro on a different port:

```bash
pnpm start -- --port 8082
# then in a new terminal, run your target:
pnpm run android   # or pnpm run ios / pnpm run web
```

### Android Specific

- No devices found: run `adb devices`. If empty, open Android Studio → Device Manager → start an emulator.
- Gradle or JDK mismatch: ensure Java 17: `java -version`. To inspect Gradle: `./android/gradlew -v`.
- Dirty or stuck build:

```bash
cd android
./gradlew clean
cd ..
pnpm run android
```

### iOS Specific

- CocoaPods issues after dependency changes:

```bash
cd ios
pod repo update
pod install
cd ..
pnpm run ios
```

- Xcode Command Line Tools not set: Xcode → Preferences → Locations → Command Line Tools: select the current Xcode.

Native state drift (after editing app.json / app.config.ts or adding plugins)

```bash
# regenerate native projects
npx expo prebuild
# then rebuild:
pnpm run android
pnpm run ios
```

If you need a truly clean slate (advanced):

```bash
rm -rf ios android
npx expo prebuild
```

### Web Specific

- White screen or bundling errors: clear browser cache and restart `pnpm run web`.
- Ensure Node >= 20.19.5 (Node 20) — older Node versions can break web bundling.

---

### 4) Handy command references

```bash
# Start dev server (choose platform from the UI)
pnpm start

# Clear Metro cache on start
pnpm start -- --clear

# List Android devices
adb devices

# Open iOS Simulator manually (macOS)
open -a Simulator
```

---

If anything here fails on your machine, copy the exact error message and platform (Android/iOS/Web, OS version, Node, pnpm) and ping us. We'll help you get unblocked fast.
