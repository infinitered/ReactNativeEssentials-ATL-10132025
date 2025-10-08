/* eslint-disable react-native/no-inline-styles */
import { Pressable, ScrollView, ViewStyle } from "react-native"
import { Link } from "expo-router"
import { Card } from "@components/Card"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { sizes, colors } from "@theme/index"
import { games } from "@shared/utils/sampleGames"

export const GamesListScreen = () => {
  const { bottom: paddingBottom, top: paddingTop } = useSafeAreaInsets()

  return (
    <ScrollView
      contentContainerStyle={[{ paddingBottom, paddingTop }, $contentContainer]}
      style={$list}>
      {games.map(({ id, name, totalRatingStars, releaseDate, cover }) => (
        <Link asChild href={`/games/${id}`} key={id}>
          <Pressable>
            <Card
              name={name}
              rating={totalRatingStars}
              releaseDate={releaseDate.human}
              imageUrl={cover.imageUrl}
            />
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  )
}

const $list: ViewStyle = {
  backgroundColor: colors.background.primary,
}

const $contentContainer: ViewStyle = {
  flex: 1,
  rowGap: sizes.spacing.lg,
  padding: sizes.spacing.md,
}
