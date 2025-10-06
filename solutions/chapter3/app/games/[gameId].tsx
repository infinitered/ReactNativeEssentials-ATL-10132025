import { Platform, Pressable, ViewStyle } from "react-native"
import { router, Stack, useLocalSearchParams } from "expo-router"
import { Icon, IconProps } from "@components/Icon"
import { GameDetailsScreen } from "@screens/GameDetailsScreen"

import { colors, fonts, sizes } from "@shared/theme"

export default function GameDetails() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  return (
    <>
      <Stack.Screen
        options={{
          contentStyle: {
            borderTopColor: colors.border.base,
            borderTopWidth: 2,
          },
          title: "Game Details",
          headerShown: true,
          headerLeft: ({ canGoBack }) =>
            renderIconButton({
              name: "arrow-left-circle",
              onPress: canGoBack ? router.back : undefined,
            }),
          headerStyle: {
            backgroundColor: colors.background.brand,
          },
          headerTitleAlign: "center",
          headerTintColor: colors.text.base,
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: fonts.primary.semiBold,
          },
        }}
      />
      <GameDetailsScreen gameId={gameId} />
    </>
  )
}

function renderIconButton(props: IconProps & { onPress?: () => void }) {
  const {
    name,
    onPress,
    color = colors.tint.base,
    size = Platform.select({ ios: 24, android: 30 }),
  } = props

  if (!name) return null
  if (!onPress) return null

  return (
    <Pressable style={$backButton} onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </Pressable>
  )
}

const $backButton: ViewStyle = {
  marginRight: sizes.spacing.md,
}
