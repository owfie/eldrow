import { wordsPerRound } from "components/Game"
import React from "react"
import { attemptedLetter, GameState, SavedGame, word } from "./types"

const equals = (a: word, b: word) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i])

export const getDefaultGameState = (savedGame: SavedGame) => {

  const incorrectAttempts = savedGame.attempts.filter(attempt => !equals(attempt,savedGame.secret))
  const lives = wordsPerRound - incorrectAttempts.length

  return { 
    attempts: savedGame.attempts,
    secret: savedGame.secret,
    date: savedGame.date,
    solvedRetroactively: savedGame.solvedRetroactively,
    gameOver: savedGame.gameOver,
    input: ['','','','',''] as word,
    focusIndex: 0,
    hint: undefined,
    lives: lives,
    attemptedLetters: [] as attemptedLetter[],
  } as GameState
}

export const gameStateReducer: React.Reducer<GameState, GameStateAction> = (state, action) => {
  switch (action.type) {
    case GameStateActionType.INPUT_SUBMIT:
      return { ...state, attempts: [...state.attempts, state.input], gameOver: equals(state.input, state.secret) }
    case GameStateActionType.INPUT_APPEND:
      {
        const cursor = state.focusIndex
        const length = state.input.length
        const newInput = [...state.input]

        newInput[state.focusIndex] = action.payload

        if (cursor < length) {
          return { ...state, input: newInput, focusIndex: cursor+1 }
        } else {
          return { ...state, input: newInput }
        }
      }
    case GameStateActionType.HINT_HIDE:
      return { ...state, hidden: false }
    case GameStateActionType.HINT_SHOW:
      return { ...state, hint: { text: action.payload, hidden: true } }
    case GameStateActionType.DECREASE_LIVES:
      return { ...state, lives: state.lives - 1 }
    case GameStateActionType.END_GAME:
      return { ...state, gameOver: true }
    case GameStateActionType.ADD_ATTEMPTED_LETTERS:
      return { ...state, attemptedLetters: [...state.attemptedLetters, ...action.payload] }
    case GameStateActionType.INPUT_CLEAR:
      const newInput = [...state.input]
      newInput.fill('')
      return { ...state, input: newInput }
    case GameStateActionType.FOCUS_UPDATE:
      return { ...state, focusIndex: action.payload }
    case GameStateActionType.FOCUS_INCREASE:
      return { ...state, focusIndex: state.focusIndex + 1 }
    case GameStateActionType.FOCUS_DECREASE:
      return { ...state, focusIndex: state.focusIndex - 1 }
    case GameStateActionType.INPUT_BACKSPACE:
      {
        const cursor = state.focusIndex
        const length = state.input.length
        const newInput = [...state.input]

        if ((cursor === length || (state.input[cursor] === '' && cursor > 0))) {
          newInput[state.focusIndex-1] = ''
          return { ...state, input: newInput, focusIndex: cursor-1 }
        } else {
          newInput[state.focusIndex] = ''
          return { ...state, input: newInput, focusIndex: cursor }
        }
      }

    default:
      throw new Error()
  }
}

export enum GameStateActionType {
  RESET_GAME,
  INPUT_SUBMIT,
  INPUT_APPEND,
  INPUT_BACKSPACE,
  INPUT_CLEAR,
  HINT_SHOW,
  HINT_HIDE,
  DECREASE_LIVES,
  END_GAME,
  ADD_ATTEMPTED_LETTERS,
  FOCUS_UPDATE,
  FOCUS_INCREASE,
  FOCUS_DECREASE
}

export type GameStateAction = {
  type: GameStateActionType.RESET_GAME
} | {
  type: GameStateActionType.INPUT_SUBMIT
} | {
  type: GameStateActionType.INPUT_APPEND
  payload: string
} | {
  type: GameStateActionType.HINT_SHOW
  payload: string
} | {
  type: GameStateActionType.HINT_HIDE
} | {
  type: GameStateActionType.INPUT_BACKSPACE
} | {
  type: GameStateActionType.DECREASE_LIVES
} | { 
  type: GameStateActionType.END_GAME
} | { 
  type: GameStateActionType.ADD_ATTEMPTED_LETTERS
  payload: attemptedLetter[]
} | {
  type: GameStateActionType.INPUT_CLEAR
} | {
  type: GameStateActionType.FOCUS_UPDATE
  payload: number
} | {
  type: GameStateActionType.FOCUS_INCREASE
} | {
  type: GameStateActionType.FOCUS_DECREASE
}

// export type GameStateActionPayload = 
 
