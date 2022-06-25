import React, { useReducer } from 'react'
import { AppStateAction, AppStateActionType, appStateReducer } from './appStateReducer'
import { AppState, SavedGame } from './types'

export const localStorageKey = "appState"

export const getDefaultAppState: () => AppState = () => {
  return { 
    loaded: false,
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
  const [state, dispatch] = useReducer(appStateReducer, getDefaultAppState())

  React.useEffect(() => {
    // When the component renders, get the data from local storage
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem(localStorageKey)
      if (storedState) {
        dispatch({ type: AppStateActionType.LOAD_FROM_LOCAL_STORAGE, payload: JSON.parse(storedState) as AppState })
      }
      dispatch({type: AppStateActionType.LOADED})
    }
  }, [])

  React.useEffect(() => {
    // If the state changes, update it in local storage
    if (typeof window !== 'undefined') {
      // If the new state is empty, or equals current state, don't do anything
      const storedState = localStorage.getItem(localStorageKey)
      if (storedState) {
        if (JSON.stringify(state) !== storedState && JSON.stringify(state) !== JSON.stringify(getDefaultAppState())) {
          localStorage.setItem(localStorageKey, JSON.stringify(state))
        }
      } else {
        localStorage.setItem(localStorageKey, JSON.stringify(state))
      }
    }

  }, [state])

  React.useEffect(() => {
    // if dark mode is enabled, set data-theme to dark
    if (state.settings.darkMode) {
      document.body.setAttribute('data-theme', 'dark')
    } else {
      document.body.setAttribute('data-theme', 'light')
    }
  }, [state.settings.darkMode])

  return <AppStateContext.Provider value={{state, dispatch}}>
    {children}
  </AppStateContext.Provider>
}