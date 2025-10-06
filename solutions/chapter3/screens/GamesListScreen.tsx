import React, { useCallback, useEffect } from "react"
import type { ViewStyle } from "react-native"
import { FlatList, Pressable } from "react-native"
import { Link, useRouter } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { api } from "../../../shared/services/api"
import { colors, sizes } from "../../../shared/theme"
import { Card } from "../components/Card"
import { Empty } from "../components/Empty"
import { useGlobalState } from "../services/state"

export const GamesListScreen = () => {
  const { bottom: paddingBottom } = useSafeAreaInsets()
  const router = useRouter()
  const { games, setGames } = useGlobalState()

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
    <FlatList
      data={games}
      style={$list}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={[{ paddingBottom }, $contentContainer]}
      ListEmptyComponent={<Empty />}
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
