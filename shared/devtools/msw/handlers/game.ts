import { rest } from "msw"

import { delay } from "../../../utils/delay"
import { findGameById } from "../utils/prepareGameData"

export const game = rest.get("https://api.rawg.io/api/games/:gameId", async (req, res, ctx) => {
  const gameItem = findGameById(Number(req.params.gameId))

  await delay(500)

  return res(ctx.status(200), ctx.json(gameItem))
})
