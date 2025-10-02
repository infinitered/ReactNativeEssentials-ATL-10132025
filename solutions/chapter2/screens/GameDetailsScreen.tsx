import type { ViewStyle } from "react-native"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { colors } from "@shared/theme"

import { Text } from "../components/Text"

export const GameDetailsScreen = ({ gameId }: { gameId: string }) => {
  const { bottom: paddingBottom, top: paddingTop } = useSafeAreaInsets()

  return (
    <View style={[{ paddingBottom, paddingTop }, $view]}>
      <Text preset="headline1" text={`Game Id: ${gameId}`} />
    </View>
  )
}

const $view: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background.primary,
}
