import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Appearance, StyleProp, useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, useTheme as useNavTheme } from "@react-navigation/native"

import * as colorBackgroundSemantics from "./tokens/colorBackgroundSemantics"
import * as colorBorderSemantics from "./tokens/colorBorderSemantics"
import * as colorTextSemantics from "./tokens/colorTextSemantics"
import * as colorTintSemantics from "./tokens/colorTintSemantics"
import * as darkColorBackgroundSemantics from "./tokens/darkColorBackgroundSemantics"
import * as darkColorBorderSemantics from "./tokens/darkColorBorderSemantics"
import * as darkColorTextSemantics from "./tokens/darkColorTextSemantics"
import * as darkColorTintSemantics from "./tokens/darkColorTintSemantics"
import * as sizeBorderSemantics from "./tokens/sizeBorderSemantics"
import * as sizeRadiusSemantics from "./tokens/sizeRadiusSemantics"
import * as sizeSpacingSemantics from "./tokens/sizeSpacingSemantics"

//  prettier-ignore
const hexAlphaSuffixes = ['00', '03', '05', '08', '0A', '0D', '0F', '12', '14', '17', '1A', '1C', '1F', '21', '24', '26', '29', '2B', '2E', '30', '33', '36', '38', '3B', '3D', '40', '42', '45', '47', '4A', '4D', '4F', '52', '54', '57', '59', '5C', '5E', '61', '63', '66', '69', '6B', '6E', '70', '73', '75', '78', '7A', '7D', '80', '82', '85', '87', '8A', '8C', '8F', '91', '94', '96', '99', '9C', '9E', 'A1', 'A3', 'A6', 'A8', 'AB', 'AD', 'B0', 'B3', 'B5', 'B8', 'BA', 'BD', 'BF', 'C2', 'C4', 'C7', 'C9', 'CC', 'CF', 'D1', 'D4', 'D6', 'D9', 'DB', 'DE', 'E0', 'E3', 'E6', 'E8', 'EB', 'ED', 'F0', 'F2', 'F5', 'F7', 'FA', 'FC', 'FF'] as const

export function changeHexAlpha(hexColor: string, opacityPercentage: number) {
  if (!/^#(?:[a-f\d]{6}(?:[a-f\d]{2})?)$/i.test(hexColor)) return hexColor

  const suffix = hexAlphaSuffixes[Math.min(Math.max(Math.round(opacityPercentage), 0), 100)]

  if (hexColor.length === 7) return `${hexColor}${suffix}`

  return `${hexColor.slice(0, 7)}${suffix}`
}

const colors = {
  background: colorBackgroundSemantics,
  text: colorTextSemantics,
  tint: colorTintSemantics,
  border: colorBorderSemantics,
  manipulators: { changeHexAlpha },
}

const darkColors = {
  background: darkColorBackgroundSemantics,
  text: darkColorTextSemantics,
  tint: darkColorTintSemantics,
  border: darkColorBorderSemantics,
  manipulators: { changeHexAlpha },
}

const sizes = {
  radius: sizeRadiusSemantics,
  border: sizeBorderSemantics,
  spacing: sizeSpacingSemantics,
}

export type Colors = typeof colors | typeof darkColors
export type Sizes = typeof sizes
export interface Theme {
  colors: Colors
  sizes: Sizes
  isDark: boolean
}

export const lightTheme: Theme = {
  colors,
  sizes,
  isDark: false,
}
export const darkTheme: Theme = {
  colors: darkColors,
  sizes,
  isDark: true,
}

/**
 * Represents a function that returns a styled component based on the provided theme.
 * @template T The type of the style.
 * @param theme The theme object.
 * @returns The styled component.
 *
 * @example
 * const $container: ThemedStyle<ViewStyle> = (theme) => ({
 *   flex: 1,
 *   backgroundColor: theme.colors.background,
 *   justifyContent: "center",
 *   alignItems: "center",
 * })
 * // Then use in a component like so:
 * const Component = () => {
 *   const { themed } = useAppTheme()
 *   return <View style={themed($container)} />
 * }
 */
export type ThemedStyle<T> = (theme: Theme) => T
export type ThemedStyleArray<T> = (
  | ThemedStyle<T>
  | StyleProp<T>
  | (StyleProp<T> | ThemedStyle<T>)[]
)[]

type ThemeContextType = {
  themeScheme: ThemeContexts
}

// create a React context and provider for the current theme
export const ThemeContext = createContext<ThemeContextType>({
  themeScheme: undefined, // default to the system theme
})

export const useThemeProvider = () => {
  const colorScheme = useColorScheme()
  const [overrideTheme, setTheme] = useState<ThemeContexts>(
    Appearance.getColorScheme() ?? undefined,
  )

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: scheme }) => {
      setTheme(scheme ?? undefined)
    })

    return () => subscription.remove()
  }, [])

  const themeScheme = overrideTheme || colorScheme || "light"
  const navigationTheme = themeScheme === "dark" ? DarkTheme : DefaultTheme

  return {
    themeScheme,
    navigationTheme,
    ThemeProvider: ThemeContext.Provider,
  }
}

export type ThemeContexts = "light" | "dark" | undefined

interface UseAppThemeValue {
  // The theme object from react-navigation
  navTheme: typeof DefaultTheme
  // The current theme object
  theme: Theme
  // The current theme context "light" | "dark"
  themeContext: ThemeContexts
  // A function to apply the theme to a style object.
  themed: <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => T
}

/**
 * Custom hook that provides the app theme and utility functions for theming.
 *
 * @returns {UseAppThemeReturn} An object containing various theming values and utilities.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useAppTheme = (): UseAppThemeValue => {
  const navTheme = useNavTheme()
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  const { themeScheme: overrideTheme } = context

  const themeContext: ThemeContexts = useMemo(
    () => overrideTheme || (navTheme.dark ? "dark" : "light"),
    [overrideTheme, navTheme],
  )

  const themeVariant: Theme = useMemo(
    () => (themeContext === "dark" ? darkTheme : lightTheme),
    [themeContext],
  )

  const themed = useCallback(
    <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3) as (ThemedStyle<T> | StyleProp<T>)[]
      const stylesArray = flatStyles.map((f) => {
        if (typeof f === "function") {
          return (f as ThemedStyle<T>)(themeVariant)
        } else {
          return f
        }
      })

      // Flatten the array of styles into a single object
      return Object.assign({}, ...stylesArray) as T
    },
    [themeVariant],
  )

  return {
    navTheme,
    theme: themeVariant,
    themeContext,
    themed,
  }
}

export { sizes, colors }
export * from "./fonts"
