import { Game, PostGamesParams } from "./types"

const BASE_URL = "https://api.rawg.io/api"
// INSERT HERE: Add your RAWG API key
// Get your free API key from: https://rawg.io/apidocs
// You can also set this as an environment variable: RAWG_API_KEY
const API_KEY = process.env.RAWG_API_KEY || "d933cb19bb0c4e83af784c91dbf2f2ed"

// Warn if API key is not configured
if (API_KEY === "YOUR_RAWG_API_KEY_HERE") {
  console.warn(
    "⚠️ RAWG API key not configured! Please set your API key in shared/services/api.ts or as RAWG_API_KEY environment variable.",
  )
  console.warn("Get your free API key from: https://rawg.io/apidocs")
}

interface RawgApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Transform RAWG.io game data to match our existing interface
// Also handles mock data format from MSW
function transformRawgGame(rawgGame: any): Game {
  // Check if this is mock data (has totalRatingStars) or RAWG data (has rating)
  const isMockData = rawgGame.totalRatingStars !== undefined

  // Format release date to match existing format
  let releaseDate: Date
  let year: number
  let month: string
  let day: number
  let humanDate: string

  if (isMockData) {
    // Handle mock data format (IGDB format)
    if (rawgGame.releaseDate && rawgGame.releaseDate.human) {
      humanDate = rawgGame.releaseDate.human
      releaseDate = new Date(rawgGame.releaseDate.date)
      year = rawgGame.releaseDate.y
      // Parse the human date to get month and day
      const dateMatch = humanDate.match(/(\w+)\s+(\d+),\s+(\d+)/)
      if (dateMatch) {
        month = dateMatch[1]
        day = parseInt(dateMatch[2])
      } else {
        month = "January"
        day = 1
      }
    } else {
      // Fallback for mock data
      releaseDate = new Date("1980-01-01")
      year = 1980
      month = "January"
      day = 1
      humanDate = "January 1, 1980"
    }
  } else {
    // Handle RAWG API format
    if (rawgGame.released && rawgGame.released !== null) {
      releaseDate = new Date(rawgGame.released)
      // Check if date is valid
      if (isNaN(releaseDate.getTime())) {
        // Fallback to a default date if parsing fails
        releaseDate = new Date("1980-01-01")
        year = 1980
        month = "January"
        day = 1
        humanDate = "January 1, 1980"
      } else {
        year = releaseDate.getFullYear()
        month = releaseDate.toLocaleDateString("en-US", { month: "long" })
        day = releaseDate.getDate()
        humanDate = `${month} ${day}, ${year}`
      }
    } else {
      // Default date when no release date is provided
      releaseDate = new Date("1980-01-01")
      year = 1980
      month = "January"
      day = 1
      humanDate = "January 1, 1980"
    }
  }

  // Convert rating to 5-star scale - normalize everything to 0-5 scale
  let ratingStars = 0
  if (isMockData) {
    // Mock data already has totalRatingStars in 0-5 scale
    ratingStars = Math.round(rawgGame.totalRatingStars || 0)
  } else {
    // RAWG data has rating in 0-5 scale, but let's ensure it's properly rounded
    ratingStars = Math.round(rawgGame.rating || 0)
  }

  // Create cover object from background_image or mock data
  const cover = isMockData
    ? {
        id: rawgGame.id,
        imageId: rawgGame.cover?.image_id || rawgGame.slug,
        imageUrl: rawgGame.cover?.imageUrl || "",
      }
    : {
        id: rawgGame.id,
        imageId: rawgGame.slug,
        imageUrl: rawgGame.background_image || rawgGame.image || "",
      }

  // Create screenshots array from short_screenshots or mock data
  const screenshots = isMockData
    ? rawgGame.screenshots?.map((screenshot: any, index: number) => ({
        id: screenshot.id || index,
        imageId: screenshot.image_id || `${rawgGame.slug}-screenshot-${index}`,
        imageUrl: screenshot.imageUrl || "",
      })) || []
    : rawgGame.short_screenshots?.map((screenshot: any, index: number) => ({
        id: screenshot.id || index,
        imageId: `${rawgGame.slug}-screenshot-${index}`,
        imageUrl: screenshot.image,
      })) || []

  // Create involved companies from developers and publishers
  const involvedCompanies = isMockData
    ? rawgGame.involvedCompanies || rawgGame.involved_companies || []
    : [
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
    summary: rawgGame.description_raw || rawgGame.description || rawgGame.summary || "",
    totalRating: ratingStars,
    totalRatingCount: rawgGame.ratings_count || rawgGame.ratingsCount || 0,
    totalRatingStars: ratingStars,
    involvedCompanies,
  }
}

async function safeFetch<ResponseT>(
  path: string,
  options?: RequestInit,
): Promise<{ ok: true; data: ResponseT } | { ok: false; error?: string }> {
  try {
    const response = await fetch(BASE_URL + path, {
      method: "GET",
      ...options,
    })

    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`)
      const errorText = await response.text()
      console.error("Error response:", errorText)
      return { ok: false, error: `${response.status}: ${response.statusText}` }
    }

    const parsed = await response.json()

    if (parsed.error) {
      console.error("API returned error:", parsed.error)
      return { ok: false, error: parsed.error }
    }

    return { ok: true, data: parsed }
  } catch (error) {
    console.error("Network error:", error)
    return { ok: false, error: error instanceof Error ? error.message : "Unknown error" }
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
      console.log(`Successfully loaded ${transformedGames.length} games`)
      return { ok: true, data: transformedGames }
    }

    console.error("Failed to load games:", response.error)
    return { ok: false, error: response.error }
  },

  getGame: async (id: number) => {
    const response = await safeFetch<any>(`/games/${id}?key=${API_KEY}`)

    if (response.ok) {
      const transformedGame = transformRawgGame(response.data)
      console.log(`Successfully loaded game: ${transformedGame.name}`)
      return { ok: true, data: transformedGame }
    }

    console.error("Failed to load game:", response.error)
    return { ok: false, error: response.error }
  },
}
