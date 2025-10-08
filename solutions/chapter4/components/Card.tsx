import React from "react"
import type { ImageStyle, ViewStyle } from "react-native"
import { Image, View } from "react-native"

import { ThemedStyle, useAppTheme } from "@shared/theme"

import { Rating } from "./Rating"
import { Text } from "./Text"

interface CardProps {
  name: string
  imageUrl: string
  releaseDate: string
  rating: number
}

export const Card = (props: CardProps) => {
  const { name, imageUrl, releaseDate, rating = 0 } = props
  const { themed } = useAppTheme()

  return (
    <View>
      <View style={themed($reflection)} />
      <View style={themed($card)}>
        <Image source={{ uri: imageUrl }} style={themed($image)} />
        <View style={themed($contentWrapper)}>
          <Text numberOfLines={1} preset="headline2" text={name} />

          <View style={themed($contentRow)}>
            <Text preset="label2" text="Released:" />
            <Text preset="title2" text={releaseDate} />
          </View>

          <Rating rating={rating} />
        </View>
      </View>
    </View>
  )
}

const $card: ThemedStyle<ViewStyle> = ({ colors, sizes }) => ({
  backgroundColor: colors.background.brand,
  borderColor: colors.border.base,
  borderRadius: sizes.radius.md,
  borderWidth: sizes.border.sm,
  flexDirection: "row",
  padding: sizes.spacing.md,
  columnGap: sizes.spacing.md,
})

const $reflection: ThemedStyle<ViewStyle> = ({ colors, sizes }) => ({
  backgroundColor: colors.background.reflection,
  borderRadius: sizes.radius.md,
  bottom: -6,
  height: "100%",
  position: "absolute",
  right: -6,
  width: "100%",
})

const $contentWrapper: ThemedStyle<ViewStyle> = ({ sizes }) => ({
  flex: 1,
  justifyContent: "center",
  rowGap: sizes.spacing.xs,
})

const $image: ThemedStyle<ImageStyle> = ({ colors, sizes }) => ({
  borderColor: colors.border.base,
  borderRadius: sizes.radius.sm,
  borderWidth: sizes.border.sm,
  height: 120,
  width: 90,
})

const $contentRow: ThemedStyle<ViewStyle> = ({ sizes }) => ({
  flexDirection: "row",
  columnGap: sizes.spacing.xs,
  alignItems: "center",
})
