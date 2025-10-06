import { rest } from "msw"

import type { PostGamesParams } from "../../../services/types"
import { gameData, sliceGames, sortGames } from "../utils/prepareGameData"

export const games = rest.get("https://api.rawg.io/api/games", async (req, res, ctx) => {
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const pageSize = parseInt(url.searchParams.get("page_size") || "20")
  const search = url.searchParams.get("search")
  const ordering = url.searchParams.get("ordering")

  // Convert RAWG.io parameters to our format
  let sortBy: PostGamesParams["sortBy"] = "releaseDate"
  let sortOrder: PostGamesParams["sortOrder"] = "asc"

  // Handle ordering parameter
  if (ordering) {
    if (ordering.includes("name")) {
      sortBy = "name"
      sortOrder = ordering.startsWith("-") ? "desc" : "asc"
    } else if (ordering.includes("released")) {
      sortBy = "releaseDate"
      sortOrder = ordering.startsWith("-") ? "desc" : "asc"
    } else if (ordering.includes("rating")) {
      sortBy = "totalRatingStars"
      sortOrder = ordering.startsWith("-") ? "desc" : "asc"
    } else if (ordering.includes("id")) {
      sortBy = "id"
      sortOrder = ordering.startsWith("-") ? "desc" : "asc"
    }
  }

  let filteredData = gameData

  // Filter for retro games (1980-1999) to match the API behavior
  filteredData = gameData.filter((game) => {
    const releaseYear = game.releaseDate?.y || 0
    return releaseYear >= 1980 && releaseYear <= 1999
  })

  // Apply search filter if provided
  if (search) {
    filteredData = filteredData.filter(
      (game) =>
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.summary.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // Create complete opts object for compatibility
  const opts: Required<PostGamesParams> = {
    sortBy,
    sortOrder,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    page,
    page_size: pageSize,
    search: search || "",
  }

  const sorted = sortGames(filteredData, opts)
  const sliced = sliceGames(sorted, opts)

  // Return in RAWG.io format
  return res(
    ctx.status(200),
    ctx.json({
      count: filteredData.length,
      next:
        page * pageSize < filteredData.length
          ? `https://api.rawg.io/api/games?page=${page + 1}&page_size=${pageSize}`
          : null,
      previous:
        page > 1 ? `https://api.rawg.io/api/games?page=${page - 1}&page_size=${pageSize}` : null,
      results: sliced,
    }),
  )
})
