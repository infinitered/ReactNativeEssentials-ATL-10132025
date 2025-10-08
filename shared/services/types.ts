export interface PostGamesParams {
  sortBy?: Extract<keyof Game, "id" | "totalRatingStars" | "name" | "releaseDate">
  sortOrder?: "asc" | "desc"
  limit?: number
  offset?: number
  page?: number
  page_size?: number
  search?: string
}

export interface Game {
  id: number
  slug: string
  name: string
  name_original: string
  description: string
  metacritic: number | null
  released: string
  tba: boolean
  updated: string
  background_image: string | null
  background_image_additional: string | null
  website: string
  rating: number
  rating_top: number
  ratings: GameRating[]
  ratings_count: number
  reviews_text_count: number
  added: number
  added_by_status: GameAddedByStatus
  playtime: number
  screenshots_count: number
  movies_count: number
  creators_count: number
  achievements_count: number
  parent_achievements_count: number
  reddit_url: string
  reddit_name: string
  reddit_description: string
  reddit_logo: string
  reddit_count: number
  twitch_count: number
  youtube_count: number
  suggestions_count: number
  alternative_names: string[]
  metacritic_url: string
  parents_count: number
  additions_count: number
  game_series_count: number
  user_game: any
  reviews_count: number
  saturated_color: string
  dominant_color: string
  parent_platforms: GameParentPlatform[]
  platforms: GamePlatform[]
  stores: GameStore[]
  developers: GameDeveloper[]
  genres: GameGenre[]
  tags: GameTag[]
  publishers: GamePublisher[]
  esrb_rating: GameEsrbRating | null
  clip: any
  short_screenshots: GameScreenshot[]
  // Computed fields to maintain compatibility with existing code
  cover: GameCover
  releaseDate: GameReleaseDate
  screenshots: GameCover[]
  summary: string
  totalRating: number
  totalRatingCount: number
  totalRatingStars: number
  involvedCompanies: GameInvolvedCompany[]
}

export interface GameRating {
  id: number
  title: string
  count: number
  percent: number
}

export interface GameAddedByStatus {
  yet: number
  owned: number
  beaten: number
  toplay: number
  dropped: number
  playing: number
}

export interface GameParentPlatform {
  platform: GamePlatformInfo
}

export interface GamePlatform {
  platform: GamePlatformInfo
  released_at: string
  requirements: GameRequirements | null
}

export interface GamePlatformInfo {
  id: number
  name: string
  slug: string
  image: string | null
  year_end: number | null
  year_start: number | null
  games_count: number
  image_background: string
}

export interface GameRequirements {
  minimum?: string
  recommended?: string
}

export interface GameStore {
  id: number
  url: string
  store: GameStoreInfo
}

export interface GameStoreInfo {
  id: number
  name: string
  slug: string
  domain: string
  games_count: number
  image_background: string
}

export interface GameDeveloper {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface GameGenre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface GameTag {
  id: number
  name: string
  slug: string
  language: string
  games_count: number
  image_background: string
}

export interface GamePublisher {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

export interface GameEsrbRating {
  id: number
  name: string
  slug: string
}

export interface GameScreenshot {
  id: number
  image: string
}

// Legacy interfaces for compatibility
export interface GameCover {
  id: number
  imageId: string
  imageUrl: string
}

export interface GameInvolvedCompany {
  id: number
  company: GameGenre
  developer: boolean
  publisher: boolean
}

export interface GameReleaseDate {
  id: number
  date: number
  human: string
  y: number
}

export type SetGames = (games: Array<Game>) => void

export type Favorites = Array<Game["id"]>

export type ToggleFavorite =
  | ((gameId: Game["id"]) => void)
  | ((gameId: Game["id"], value?: boolean) => void)

export type Reviews = Record<Game["id"], Array<string>>

export type AppendReview = (gameId: Game["id"], review: string) => void

export interface GlobalStateContextData {
  games: Array<Game>
  setGames: SetGames
  favorites: Favorites
  toggleFavorite: ToggleFavorite
  reviews: Reviews
  appendReview: AppendReview
}
