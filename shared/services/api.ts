import { Game, PostGamesParams } from "./types"

const BASE_URL = "https://api.rawg.io/api"
// INSERT HERE: Add your RAWG API key
// Get your free API key from: https://rawg.io/apidocs
const API_KEY = "YOUR_RAWG_API_KEY_HERE"

interface RawgApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Transform RAWG.io game data to match our existing interface
function transformRawgGame(rawgGame: any): Game {
  // Format release date to match existing format
  const releaseDate = new Date(rawgGame.released)
  const year = releaseDate.getFullYear()
  const month = releaseDate.toLocaleDateString("en-US", { month: "long" })
  const day = releaseDate.getDate()
  const humanDate = `${month} ${day}, ${year}`

  // Convert rating to 5-star scale (RAWG uses 0-5, we want 0-5 stars)
  const ratingStars = rawgGame.rating || 0

  // Create cover object from background_image
  const cover = {
    id: rawgGame.id,
    imageId: rawgGame.slug,
    imageUrl: rawgGame.background_image || "",
  }

  // Create screenshots array from short_screenshots
  const screenshots =
    rawgGame.short_screenshots?.map((screenshot: any, index: number) => ({
      id: screenshot.id || index,
      imageId: `${rawgGame.slug}-screenshot-${index}`,
      imageUrl: screenshot.image,
    })) || []

  // Create involved companies from developers and publishers
  const involvedCompanies = [
    ...(rawgGame.developers || []).map((dev: any) => ({
      id: dev.id,
      company: { id: dev.id, name: dev.name },
      developer: true,
      publisher: false,
    })),
    ...(rawgGame.publishers || []).map((pub: any) => ({
      id: pub.id,
      company: { id: pub.id, name: pub.name },
      developer: false,
      publisher: true,
    })),
  ]

  return {
    ...rawgGame,
    // Legacy fields for compatibility
    cover,
    releaseDate: {
      id: rawgGame.id,
      date: releaseDate.getTime(),
      human: humanDate,
      y: year,
    },
    screenshots,
    summary: rawgGame.description_raw || rawgGame.description || "",
    totalRating: rawgGame.rating || 0,
    totalRatingCount: rawgGame.ratings_count || 0,
    totalRatingStars: ratingStars,
    involvedCompanies,
  }
}

async function safeFetch<ResponseT>(
  path: string,
  options?: RequestInit,
): Promise<{ ok: true; data: ResponseT } | { ok: false }> {
  try {
    const response = await fetch(BASE_URL + path, {
      method: "GET",
      ...options,
    })

    if (!response.ok) {
      return { ok: false }
    }

    const parsed = await response.json()

    if (parsed.error) {
      return { ok: false }
    }

    return { ok: true, data: parsed }
  } catch {
    return { ok: false }
  }
}

export const api = {
  getGames: async (params: PostGamesParams = {}) => {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      page_size: String(params.limit || 20),
      page: String(params.page || 1),
      // Automatically filter for retro games (1980-1999)
      dates: "1980-01-01,1999-12-31",
    })

    // Add search if provided
    if (params.search) {
      searchParams.append("search", params.search)
    }

    // Add sorting if provided
    if (params.sortBy) {
      switch (params.sortBy) {
        case "name":
          searchParams.append("ordering", params.sortOrder === "desc" ? "-name" : "name")
          break
        case "releaseDate":
          searchParams.append("ordering", params.sortOrder === "desc" ? "-released" : "released")
          break
        case "totalRatingStars":
          searchParams.append("ordering", params.sortOrder === "desc" ? "-rating" : "rating")
          break
        case "id":
          searchParams.append("ordering", params.sortOrder === "desc" ? "-id" : "id")
          break
      }
    }

    const response = await safeFetch<RawgApiResponse<any>>(`/games?${searchParams.toString()}`)

    if (response.ok) {
      const transformedGames = response.data.results.map(transformRawgGame)
      return { ok: true, data: transformedGames }
    }

    return { ok: false }
  },

  getGame: async (id: number) => {
    const response = await safeFetch<any>(`/games/${id}?key=${API_KEY}`)

    if (response.ok) {
      const transformedGame = transformRawgGame(response.data)
      return { ok: true, data: transformedGame }
    }

    return { ok: false }
  },
}
