# Chapter 4: Blending In

Run `./scripts/skipTo 4` to copy the solution to your main app, otherwise you may code along. Reference `./solutions/chapter4` if you get stuck.

## Overview

This chapter covers adaptive theming and system integration in React Native.

**Note:** To toggle between light and dark mode, you can use the system settings on your device. Alternatively, you can:

- (iOS) Press `Command + Shift + A` on iOS Simulator to toggle between light and dark mode.
- (Android) In a terminal, enter `adb shell "cmd uimode night no"`, `adb shell "cmd uimode night yes"` to toggle between light and dark mode.

## Learning Objectives

- Implement system-aware theming
- Create light and dark mode support
- Handle theme transitions

## Tasks for this section [code-a-long]

### 1. Check out what the designers sent us

a. Observe `darkColors` and the related tokens

b. Set up the types and helper functions for styling components based on the provided theme

### 2. Wrap `_layout.tsx` with the `ThemeProvider`

### 3. Update the styling in `components` to use the current theme

a. Get colors from `useTheme`

```diff
- import { colors, fonts, sizes } from '../../shared/theme'
+ import { fonts, sizes } from '../../shared/theme'
+ const { theme: { colors } } = useAppTheme()
```

#### b. Update the style to be a "themed" function

```diff
- const $card: ViewStyle = {
+ const $card: ThemedStyle<ViewStyle> = ({ colors }) => ({
  ...
- }
+ })
```

#### c. Update the style in the component to use the theme:

```diff
+ const { themed } = useAppTheme()
- <View style={$card}>
+ <View style={themed($card)}>
```

## Key Concepts

_Coming soon - key concepts will be added here_

---

[Previous: Chapter 3](./chapter03.md) | [Next: Chapter 5](./chapter05.md)
