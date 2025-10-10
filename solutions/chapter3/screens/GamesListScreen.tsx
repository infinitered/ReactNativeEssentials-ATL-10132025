import { useCallback, useEffect } from "react"
import type { ViewStyle } from "react-native"
import { Pressable, SectionList } from "react-native"
import { Link } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Card } from "@components/Card"
import { Empty } from "@components/Empty"
import { Pill } from "@components/Pill"
import { useGlobalState } from "@services/state"
import { api } from "@shared/services/api"
import { colors, sizes } from "@theme/index"

export const GamesListScreen = () => {
  const { bottom: paddingBottom } = useSafeAreaInsets()
  const { gamesSectionList, setGames } = useGlobalState()

  const getGames = useCallback(async () => {
    const response = await api.getGames()
    if (response.ok) {
      setGames(response.data)
    }
  }, [setGames])

  useEffect(() => {
    getGames()
  }, [getGames])

  return (
    <SectionList
      sections={gamesSectionList}
      style={$list}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={[{ paddingBottom }, $contentContainer]}
      ListEmptyComponent={<Empty />}
      renderSectionHeader={({ section: { year } }) => <Pill text={year} />}
      renderItem={({ item }) => (
        <Link asChild href={`/games/${item.id}`} key={item.id}>
          <Pressable>
            <Card
              name={item.name}
              rating={item.totalRatingStars}
              releaseDate={item.releaseDate.human}
              imageUrl={item.cover.imageUrl}
            />
          </Pressable>
        </Link>
      )}
    />
  )
}

const $list: ViewStyle = {
  backgroundColor: colors.background.primary,
}

const $contentContainer: ViewStyle = {
  rowGap: sizes.spacing.lg,
  padding: sizes.spacing.md,
}
