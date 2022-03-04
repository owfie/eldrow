import { localStorageKey } from "./appState"
import { AppState, GameState } from "./types"

export interface AppStateAction {
  type: AppStateActionType
  payload?: GameState
}

export enum AppStateActionType {
  TOGGLE_DARK_MODE,
  TOGGLE_HARD_MODE,
  UPDATE_GAME
}

export const initializer = (initialState: AppState) => {
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem(localStorageKey)
    return storedState ? JSON.parse(storedState) as AppState : initialState
  } else {
    return initialState
  }
}

export const appStateReducer: React.Reducer<AppState, AppStateAction> = (state: AppState, action: AppStateAction) => {
  switch (action.type) {
    case AppStateActionType.TOGGLE_DARK_MODE: 
      return { ...state, settings: { ...state.settings, darkMode: !state.settings.darkMode } }
      
    case AppStateActionType.TOGGLE_HARD_MODE:
      return { ...state, settings: { ...state.settings, hardMode: !state.settings.hardMode } }

    case AppStateActionType.UPDATE_GAME:
      if (!action.payload) {
        return state
      } else {
        const newGame = action.payload!

        if (state.gameHistory.find(g => g.date === newGame.date)) {
          return { ...state, gameHistory: state.gameHistory.map(g => g.date === newGame.date ? newGame : g) }
        } else {
          return { ...state, gameHistory: [...state.gameHistory, newGame] }
        }
      }

    default: 
      throw new Error()
  }
}