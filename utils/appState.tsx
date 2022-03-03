import React, { useReducer } from 'react'
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

const AppStateContext = React.createContext<AppState>(getDefaultAppState())

export const AppStateReducer

export const AppStateProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, getDefaultAppState())

  React.useEffect(() => {
    const storedState = localStorage.getItem('appState')
    if (storedState) {
      dispatch({type: 'SET_STATE', payload: JSON.parse(storedState)})
    }
  }, [])

  return <AppStateContext.Provider value={{state, dispatch}}>
    {children}
  </AppStateContext.Provider>
}