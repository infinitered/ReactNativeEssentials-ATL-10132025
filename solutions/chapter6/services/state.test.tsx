import { gamesSectionList } from "./state"
import type { Game } from "../../shared/services/types"

describe("gamesSectionList", () => {
  it("should return the correct section list", () => {
    const games: Array<Game> = [
      { id: 1, releaseDate: { y: 2020 } },
      { id: 2, releaseDate: { y: 2021 } },
    ]
    const sectionList = gamesSectionList(games)
    expect(sectionList).toEqual([
      { year: "2020", key: "2020", data: [games[0]] },
      { year: "2021", key: "2021", data: [games[1]] },
    ])
  })
})
