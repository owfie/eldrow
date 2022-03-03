import { localStorageKey } from "./appState"
import { AppState } from "./types"

export enum AppStateAction {
  TOGGLE_DARK_MODE,
  TOGGLE_HARD_MODE,

}

export const initializer = (initialState: AppState) => {
  const storedState = localStorage.getItem(localStorageKey)
  if (storedState) {
    return JSON.parse(storedState) as AppState
  } else {
    return initialState
  }
}

export const appStateReducer: React.Reducer<AppState, AppStateAction> = (state: AppState, action: AppStateAction) => {
  switch (action) {
    case AppStateAction.TOGGLE_DARK_MODE: 
      return {...state, settings: { ...state.settings, darkMode: !state.settings.darkMode } }
    case AppStateAction.TOGGLE_HARD_MODE:
      return {...state, settings: { ...state.settings, hardMode: !state.settings.hardMode } }
    default: 
      throw new Error()
  }
}