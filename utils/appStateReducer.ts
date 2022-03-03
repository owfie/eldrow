import { localStorageKey } from "./appState"
import { AppState } from "./types"

export enum AppStateAction {
  TOGGLE_DARK_MODE,
  TOGGLE_HARD_MODE,

}

export const initializer = (initialState: AppState) => {
  return JSON.parse(localStorage.getItem(localStorageKey) as AppState || initialState)
}

export const appStateReducer: React.Reducer<AppState, AppStateAction> = (state: AppState, action: AppStateAction) => {
  switch (action) {
    case AppStateAction.TOGGLE_DARK_MODE: return {...state, settings: { ...state.settings, darkMode: !state.settings.darkMode } }
    default: throw new Error()
  }
}