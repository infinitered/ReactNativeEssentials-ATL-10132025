import type { PropsWithChildren } from "react"
import React, { createContext, useContext, useMemo, useState } from "react"

import type { Game, GlobalStateContextData } from "@shared/services/types"

export const GlobalStateContext = createContext<
  Pick<GlobalStateContextData, "games" | "setGames" | "gamesSectionList">
>({
  games: [],
  gamesSectionList: [],
  setGames: (_games: Array<Game>) => undefined,
})

export const gamesSectionList = (games: Array<Game>) => {
  const initialValue: { [k: number]: unknown[] } = {}
  const gameListMap = games.reduce((acc, curr) => {
    const year = curr.releaseDate.y
    if (acc[year]) {
      acc[year].push(curr)
    } else {
      acc[year] = [curr]
    }
    return acc
  }, initialValue)

  return Object.entries(gameListMap).map(([k, v]) => ({
    year: k,
    key: k,
    data: v,
  }))
}

export const GlobalStateProvider = ({ children }: PropsWithChildren) => {
  const [games, setGames] = useState<Array<Game>>([])

  const gamesSectionList = useMemo(() => {
    const initialValue: { [k: number]: unknown[] } = {}
    const gameListMap = games.reduce((acc, curr) => {
      const year = curr.releaseDate.y
      if (acc[year]) {
        acc[year].push(curr)
      } else {
        acc[year] = [curr]
      }
      return acc
    }, initialValue)

    return Object.entries(gameListMap).map(([k, v]) => ({
      year: k,
      key: k,
      data: v,
    }))
  }, [games])

  return (
    <GlobalStateContext.Provider
      value={{
        games,
        setGames,
        gamesSectionList,
      }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error("useGlobalState must be used within GlobalStateProvider")
  }
  return context
}
