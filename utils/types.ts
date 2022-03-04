interface AppState { 
  settings: {
     darkMode: boolean
     hardMode: boolean
  }
  gameHistory: GameState[]
}

interface GameState {
  gameOver: boolean
  date: string
  secret: word 
  attempts: attempts
  solvedRetroactively: boolean // Future-proofing for being able to solve past puzzles while maintaining honest winstreak
}

type word = string[]
type attempts = word[]
type focusIndex = number
type input = string[]

type page = 'game' | 'stats' | 'about'

type grade = 'yes' | 'almost' | 'no' | undefined


type hint = {
  text: string
  hidden: boolean
}

type attemptedLetter = {
  [letter: string]: grade
}

export type { AppState, GameState, word, attempts, focusIndex, input, page, hint, attemptedLetter, grade }