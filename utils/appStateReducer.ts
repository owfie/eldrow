import { localStorageKey } from "./appState"
import { AppState, SavedGame } from "./types"

export type AppStateAction = {
  type: AppStateActionType.UPDATE_GAME
  payload?: SavedGame
} | {
  type: AppStateActionType.TOGGLE_DARK_MODE
} | {
  type: AppStateActionType.TOGGLE_HARD_MODE
} | {
  type: AppStateActionType.LOAD_FROM_LOCAL_STORAGE
  payload: AppState
} | {
  type: AppStateActionType.LOADED
}

export enum AppStateActionType {
  TOGGLE_DARK_MODE,
  TOGGLE_HARD_MODE,
  UPDATE_GAME,
  LOAD_FROM_LOCAL_STORAGE,
  LOADED
}

export const appStateReducer: React.Reducer<AppState, AppStateAction> = (state: AppState, action: AppStateAction) => {
  switch (action.type) {
    case AppStateActionType.LOADED:
      return { ...state, loaded: true }
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
    case AppStateActionType.LOAD_FROM_LOCAL_STORAGE:
      return action.payload
    default: 
      throw new Error()
  }
}