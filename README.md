# React Native Essentials

Welcome to the React Native Essentials workshop! This hands-on workshop will go through the fundamentals of React Native from “init-ing” our application to getting our app to looking good and functional. It will wrap up with a discussion on more “intermediate” topics and address any questions the class may have. The objective of this workshop is to help React developers take the plunge into mobile and show the similarities between the two platforms.

## Table of Contents

- **[Chapter 0: Debugging](./docs/chapters/chapter00.md)** - Essential debugging tools and techniques
- **[Chapter 1: Visual Concepts](./docs/chapters/chapter01.md)** - React Native UI basics and styling  
- **[Chapter 2: Navigation Plus](./docs/chapters/chapter02.md)** - Expo Router, stack navigation, and deep linking
- **[Chapter 3: Meet the List](./docs/chapters/chapter03.md)** - List components, data loading, and performance
- **[Chapter 4: Blending In](./docs/chapters/chapter04.md)** - Theme system and adaptive theming
- **[Chapter 5: Accessibility](./docs/chapters/chapter05.md)** - Inclusive design and assistive technologies
- **[Chapter 6: Unit and E2E Testing](./docs/chapters/chapter06.md)** - Comprehensive testing strategies

---

<details open>
  <summary><strong>Table of Contents</strong></summary>

- React Native Essentials
  - [Documentation](./docs/README.md)
  - [Quick Start](#quick-start)
  - [Troubleshooting](#troubleshooting)
  - [Learn More](#learn-more)

---

## Quick Start

For the full instructions on how to setup your environment for React Native development, head on over to our [React Native Essentials Starter Pack Environment Setup](https://github.com/infinitered/ReactNativeEssentialsStarterPack/blob/main/docs/environment-setup-guide.md) doc (be sure to also set up either your iOS Simulator and/or Android Emulator).

1. Run the project setup script:

```bash
npm run setup
```

2. Start the metro bundler:

```bash
npm start
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

- Web

  ```bash
  npm run web
  ```

4. Build for your device:

- [Android link](./docs/simulators-setup.md#yarn-android)
- [iOS link](./docs/simulators-setup.md#launching-a-specific-simulator)

5. If you'd like to fast forward your assignment to a specific chapter, run this script (replacing the number with the chapter you'd like to skip to). This will copy the contents of the given chapter to your src folder.

```bash
npm run skipTo 3
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
