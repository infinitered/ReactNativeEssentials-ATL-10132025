import type { TextStyle, ViewStyle } from "react-native"
import { View } from "react-native"

import { sizes, ThemedStyle, useAppTheme } from "@theme/index"

import { Icon } from "./Icon"
import { Text } from "./Text"

interface RatingProps {
  rating: number
  ratingsCount?: number
}

export const Rating = ({ rating, ratingsCount }: RatingProps) => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()
  const label = ["Rating", ratingsCount !== undefined && `(${ratingsCount} ratings)`]
    .filter(Boolean)
    .join(" ")

  // Create array of 5 stars - rating is already normalized to 0-5 scale at API level
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starRating = i + 1
    if (starRating <= rating) {
      // Filled star
      return <Icon color={colors.tint.accent} key={i} name="star" />
    } else {
      // Empty star
      return <Icon color={colors.text.baseMuted} key={i} name="star" />
    }
  })

  return (
    <View style={$container} accessible accessibilityLabel={`Rating: ${rating} stars`}>
      <Text style={$label} preset="label2" text={`${label}:`} />
      <View style={$starsContainer}>
        {stars}
        <Text style={themed($ratingText)} preset="label2" text={`${rating}.0`} />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  columnGap: sizes.spacing.xs,
  alignItems: "center",
}

const $label: TextStyle = {
  bottom: -2,
}

const $starsContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  columnGap: sizes.spacing.xs,
}

const $ratingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text.baseMuted,
})
