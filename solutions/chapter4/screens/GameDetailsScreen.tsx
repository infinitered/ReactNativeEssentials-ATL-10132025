import React, { useCallback, useEffect, useState } from "react"
import type { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { Image, ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Empty } from "@components/Empty"
import { Rating } from "@components/Rating"
import { Text } from "@components/Text"
import { api } from "@shared/services/api"
import type { Game } from "@shared/services/types"
import { sizes, ThemedStyle, useAppTheme } from "@shared/theme"

interface GameDetailsScreenProps {
  gameId?: number
}

export const GameDetailsScreen = ({ gameId }: GameDetailsScreenProps) => {
  const { bottom: paddingBottom } = useSafeAreaInsets()
  const { themed } = useAppTheme()

  const [game, setGame] = useState<Game | undefined>()

  const getGame = useCallback(async () => {
    if (gameId === undefined) return

    const response = await api.getGame(gameId)

    if (response.ok) {
      setGame(response.data)
    }
  }, [gameId])

  useEffect(() => {
    setGame(undefined)
    getGame()
  }, [getGame])

  if (gameId === undefined) {
    return (
      <View style={themed($missingWrapper)}>
        <Empty text={"No game selected"} icon="frown" />
      </View>
    )
  }

  const {
    cover,
    name,
    releaseDate,
    genres,
    screenshots,
    involvedCompanies,
    totalRatingStars,
    totalRatingCount,
    summary,
  } = game ?? {}

  return (
    <ScrollView
      style={themed($scrollView)}
      contentContainerStyle={[$contentContainer, { paddingBottom }]}>
      {screenshots ? (
        <Image
          blurRadius={10}
          source={{ uri: screenshots[0]?.imageUrl }}
          style={themed($imageBackground)}
        />
      ) : (
        <View style={themed($imageBackground)} />
      )}
      <View style={themed($bodyWrapper)}>
        <View style={themed($headerWrapper)}>
          {cover ? (
            <Image resizeMode="cover" source={{ uri: cover?.imageUrl }} style={themed($image)} />
          ) : (
            <View style={themed($image)} />
          )}

          <Text preset="headline1" text={name} />
        </View>

        {!game ? (
          <Empty text={"Loading\nPlease Wait..."} icon="loader" />
        ) : (
          <>
            <View style={$informationWrapper}>
              <View style={$informationRow}>
                <Text preset="label2" text="Released:" />
                <Text preset="title2" text={releaseDate?.human} style={$informationValue} />
              </View>
              <View style={$informationRow}>
                <Text preset="label2" text="Genre:" />
                <Text
                  preset="title2"
                  text={genres?.map((g) => g.name).join(", ")}
                  style={$informationValue}
                />
              </View>
              <View style={$informationRow}>
                <Text preset="label2" text="Studio:" />
                <Text
                  preset="title2"
                  text={involvedCompanies?.map((c) => c.company.name).join(", ")}
                  style={$informationValue}
                />
              </View>
              {!!totalRatingStars && (
                <Rating ratingsCount={totalRatingCount} rating={totalRatingStars} />
              )}
            </View>

            <View style={$descriptionWrapper}>
              <Text text={summary} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
}

const $scrollView: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background.primary,
})

const $contentContainer: ViewStyle = {
  flexGrow: 1,
}

const $bodyWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background.primary,
  paddingHorizontal: sizes.spacing.md,
  flexGrow: 1,
})

const $informationWrapper: ViewStyle = {
  paddingVertical: sizes.spacing.md,
  rowGap: sizes.spacing.xs,
}

const $informationRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  columnGap: sizes.spacing.xs,
}

const $informationValue: TextStyle = {
  flex: 1,
  top: -2,
}

const $descriptionWrapper: ViewStyle = {
  paddingVertical: sizes.spacing.md,
}

const $imageBackground: ThemedStyle<ImageStyle> = ({ colors }) => ({
  height: 175,
  width: "100%",
  backgroundColor: colors.background.secondary,
  borderColor: colors.border.base,
  borderBottomWidth: sizes.border.sm,
})

const $image: ThemedStyle<ImageStyle> = ({ colors }) => ({
  borderColor: colors.border.base,
  borderRadius: sizes.radius.sm,
  borderWidth: sizes.border.sm,
  height: 153,
  marginEnd: sizes.spacing.md,
  width: 115,
  backgroundColor: colors.background.secondary,
  position: "absolute",
  bottom: 0,
})

const $headerWrapper: ThemedStyle<ViewStyle> = (themed) => ({
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: sizes.spacing.md,
  paddingLeft: ($image(themed).width as number) + sizes.spacing.md,
  minHeight: 104,
})

const $missingWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.background.primary,
  paddingHorizontal: sizes.spacing.md,
})
