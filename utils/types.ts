interface AppState { 
  loaded: boolean
  settings: {
     darkMode: boolean
     hardMode: boolean
  }
  gameHistory: SavedGame[]
}

interface SavedGame {
  gameOver: boolean
  date: string
  secret: word 
  attempts: attempts
  solvedRetroactively: boolean // Future-proofing for being able to solve past puzzles while maintaining honest winstreak
}

interface GameState extends SavedGame {
  lives: number
  focusIndex: number
  attemptedLetters: attemptedLetter[]
  hint: hint
  input: word
}

type word = string[]
type attempts = word[]
type focusIndex = number

type page = 'game' | 'stats' | 'about'

type grade = 'yes' | 'almost' | 'no' | undefined

type hint = {
  text: string
  hidden: boolean
} | undefined

type attemptedLetter = {
  [letter: string]: grade
}

type FirestoreWord = {
  word?: string
  date: string
}

export type {
  FirestoreWord,
  AppState,
  SavedGame,
  GameState,
  word,
  attempts,
  focusIndex,
  page,
  hint,
  attemptedLetter,
  grade,
}