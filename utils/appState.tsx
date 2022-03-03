import React, { useReducer } from 'react'
import { AppStateAction, appStateReducer, initializer } from './appStateReducer'
import { AppState } from './types'

export const localStorageKey = "appState"

export const getDefaultAppState: () => AppState = () => {
  return { 
    settings: {
      darkMode: false,
      hardMode: false
    },
    gameHistory: []
  }
}

interface AppStateContextShape {
  state: AppState
  dispatch?: React.Dispatch<AppStateAction>
}

export const AppStateContext = React.createContext<AppStateContextShape>({ state: getDefaultAppState() })

export const AppStateProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(appStateReducer, getDefaultAppState(), initializer)

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state))
  }, [state])

  return <AppStateContext.Provider value={{state, dispatch}}>
    {children}
  </AppStateContext.Provider>
}