import React, { createContext, useContext, useState } from 'react'

interface Game {
  id: number
  name: string
}

interface AppState {
  games: Game[]
  selectedGame?: Game
  isLoading: boolean
}

interface AppStateContextData {
  state: AppState
  setState: (state: AppState) => void
}

const AppStateContext = createContext<AppStateContextData | undefined>(undefined)

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>({
    games: [],
    isLoading: false,
  })

  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }
  return context
}
