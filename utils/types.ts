type word = string[]
type attempts = string[]
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

export type { word, attempts, focusIndex, input, page, hint, attemptedLetter, grade }