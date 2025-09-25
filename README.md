# React Native Essentials

Welcome to the React Native Essentials workshop! This hands-on workshop will go through the fundamentals of React Native from “init-ing” our application to getting our app to looking good and functional. It will wrap up with a discussion on more “intermediate” topics and address any questions the class may have. The objective of this workshop is to help React developers take the plunge into mobile and show the similarities between the two platforms.

Table of contents (subject to change):

1. Overview
   1. Setting up the Environment
   2. Working with dependencies
   3. Application Architecture
   4. Looking Under the Hood
2. Debugging
3. Visual Concepts
   1. Making Stuff Look Good (custom components, styling, and layout)
4. Navigating Plus
5. Meet the List
   1. Long List Concepts
   2. Section Lists
   3. API Data
6. Blending in
7. Accessibility essentials
8. Unit & E2E Testing

---

<details open>
  <summary><strong>Table of Contents</strong></summary>

- React Native Essentials
  - [Chapter Docs](./docs/chapters/chapter01.md)
  - [Quick Start](#quick-start)
  - [Troubleshooting](#troubleshooting)
  - [Learn More](#learn-more)

---

## Quick Start

For the full instructions on how to setup your environment for React Native development, head on over to our [React Native Essentials Starter Pack Environment Setup](https://github.com/infinitered/ReactNativeEssentialsStarterPack/blob/main/docs/environment-setup-guide.md) doc (be sure to also set up either your iOS Simulator and/or Android Emulator).

1. Run the project setup script:

```bash
./scripts/setup
```

2. Start the metro bundler:

```bash
npm run start
```

3. Build in dev mode:

- Android

  ```bash
  npm run android
  ```

- iOS

  ```bash
  npm run ios
  ```

4. Build for your device:

- [Android link](./docs/simulators-setup.md#yarn-android)
- [iOS link](./docs/simulators-setup.md#launching-a-specific-simulator)

5. If you'd like to fast forward your assignment to a specific chapter, run this script (replacing the 8 with the chapter you'd like to skip to). This will copy the contents of the given chapter to your app folder.

```bash
./scripts/skipTo 8
```

## Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Set Up Your Environment](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&platform=android&device=physical) - an **overview** from Expo on setting up your development environment
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
