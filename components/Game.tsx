import React from "react"
import styles from './Game.module.scss'
import { LetterBox, WordBox } from "./LetterBox"

import { attemptedLetter, FirestoreWord, SavedGame, word } from '../utils/types'
import { PressedKeyContext } from "./KeyContext"
import { words } from "words"
import { Hint } from "./Hint"
import { HealthBar } from "./HealthBar"
import { Keyboard } from "./Keyboard"

import { grade } from '../utils/types'
import { AppStateContext } from "utils/appState"
import { AppStateActionType } from "utils/appStateReducer"
import { GameStateActionType, gameStateReducer, getDefaultGameState } from "utils/gameStateReducer"

import _, { includes, isEqual } from "lodash"

const getWinHint = (livesLeft: number) => {
  switch (livesLeft) {
    case 1: return 'Phew!'
    case 2: return 'Nice!'
    case 3: return 'Good job!'
    case 4: return 'Great work!'
    case 5: return 'Wow!'
    default: return 'Uhhh... this is awkward.'
  }
}

export const lettersPerWord = 5
export const wordsPerRound = 6

const getGrade: (l: string, p: number, secret: word) => grade = (letter: string, position: number, secret) =>{
  if (secret[position] === letter) return 'yes'
  if (secret.includes(letter)) return 'almost'
  return 'no'
}

interface GameProps {
  savedGame: SavedGame
}

export const Game: React.FC<GameProps> = (props) => {

  const { savedGame } = props

  const { state: appState, dispatch: appDispatcher } = React.useContext(AppStateContext)

  const [ state, dispatch ] = React.useReducer(gameStateReducer, getDefaultGameState(savedGame))

  const { secret, date, input, focusIndex, lives, attemptedLetters, gameOver, hint, attempts, solvedRetroactively } = state
  const {pressedKey: activeKey, setKey} = React.useContext(PressedKeyContext)

  React.useEffect(() => {
    // If a new attempt is added, update the App State
    if (attempts.length === 0) return
    if (JSON.stringify(attempts) === JSON.stringify(getDefaultGameState(savedGame).attempts)) return
    if (JSON.stringify(savedGame.attempts) === JSON.stringify(attempts)) return

    // console.log('Updating saved game: ', savedGame)
    appDispatcher && appDispatcher({type: AppStateActionType.UPDATE_GAME, payload: {
      date,
      secret,
      attempts,
      solvedRetroactively,
      gameOver
    }})
  },[appDispatcher, attempts, date, gameOver, savedGame, savedGame.attempts, secret, solvedRetroactively])

  React.useEffect(() => {
    if (activeKey) {
      dispatch({
        type: GameStateActionType.HINT_HIDE
      })
    }
  }, [activeKey])

  React.useEffect(() => {
    if (hint && !hint.hidden) {
      setTimeout(() => {
        dispatch({
          type: GameStateActionType.HINT_HIDE
        })
      }
      , 5000)
    }
  }, [hint])

  const submitWord = React.useCallback((word: word) => {

    // If word contains an empty string, it's not a valid word.
    if (word.includes('')) {
      dispatch({
        type: GameStateActionType.HINT_SHOW,
        payload: 'Looks like you\'ve missed a letter.'
      })
      return
    }
    
    // If word is already in the attempts, it's not a valid word.
    if (includes(JSON.stringify(attempts as word[]), JSON.stringify(word))) {
      dispatch({
        type: GameStateActionType.HINT_SHOW,
        payload: 'You\'ve already tried that.'
      })
      return
    } else {
    }

    // If word is not in the words list, it's not a valid word.
    if (!words.includes(word.join(''))) {
      dispatch({
        type: GameStateActionType.HINT_SHOW,
        payload: 'Are you sure that\'s a word?'
      })
      return
    }

    // If word is valid, add it to the attempts.

    // appDispatcher && appDispatcher({
    //   type: AppStateActionType.UPDATE_GAME,
    //   payload: {
    //     date,
    //     secret: secret,
    //     attempts: [...attempts, word],
    //     solvedRetroactively: false,
    //     gameOver: gameOver
    //   }
    // })

    dispatch({
      type: GameStateActionType.INPUT_SUBMIT,
    })

    const newAttemptedLetters = word.map((letter, i) => {
      return ({[letter]: getGrade(letter, i, secret)})
    }) as attemptedLetter[]

    dispatch({
      type: GameStateActionType.ADD_ATTEMPTED_LETTERS,
      payload: newAttemptedLetters
    })

    // If word is the secret, end the game.
    if (isEqual(word, secret)) {
      dispatch({
        type:GameStateActionType.END_GAME
      })
      dispatch({
        type: GameStateActionType.HINT_SHOW,
        payload: getWinHint(lives)
      })
      return
    }

    dispatch({
      type: GameStateActionType.DECREASE_LIVES
    })

    // If no attempts remaining, end the game.
    if (attempts.length+1 === wordsPerRound) {
      dispatch({
        type:GameStateActionType.END_GAME
      })

      const outputWord = secret[0].toUpperCase() + secret.slice(1).join('').toLowerCase()
      dispatch({
        type: GameStateActionType.HINT_SHOW,
        payload: `Game over! The word was ${outputWord}.`
      })
      return
    }
  
    dispatch({
      type: GameStateActionType.INPUT_CLEAR
    })

    dispatch({
      type: GameStateActionType.FOCUS_UPDATE,
      payload: 0
    })

  },[attempts, lives, secret])

  const dispatchBackspace = React.useCallback(() => {
    if (focusIndex <= lettersPerWord) {
      dispatch({
        type: GameStateActionType.INPUT_BACKSPACE
      })
    }
  }, [focusIndex])

  const dispatchInput = React.useCallback((key: string) => {
    if (focusIndex < lettersPerWord) {
      dispatch({
        type: GameStateActionType.INPUT_APPEND,
        payload: key
      })
    }
  }, [focusIndex])

  React.useEffect(() => {
    if (activeKey) {
      if (activeKey === 'Backspace') {
        dispatchBackspace()
        setKey(undefined)

      } else if(activeKey === 'Enter') {
        if(!gameOver) submitWord(input)
        setKey(undefined)
        
      } else {
        dispatchInput(activeKey)
        setKey(undefined)
      }
    }
  }, [activeKey, dispatchInput, dispatchBackspace, setKey, focusIndex, input, submitWord, gameOver])

  return (
    <div className={styles.Game} style={{position:'relative'}}>
      {
        hint && 
        <Hint hidden={hint.hidden}>
          {hint.text}
        </Hint>
      }
      <div className={styles.gui}>
        <HealthBar total={wordsPerRound} lives={lives}/>
        <Keyboard attemptedLetters={attemptedLetters}/>
      </div>
     {/* Game: { JSON.stringify(savedGame) } */}
      <div className={styles.gameZone}>
        {attempts.map((attempt, index) => {
          return <WordBox key={index}>
            {attempt.map((letter, index) => (
              <LetterBox key={index} grade={getGrade(letter, index, secret)}>
                {letter}
              </LetterBox>
            ))}
          </WordBox>
        })}
        {!gameOver && 
        <WordBox>
            {input.map((letter, i) => {
              return <LetterBox onClick={() => dispatch({ type: GameStateActionType.FOCUS_UPDATE, payload: i})} key={`input-${i}`} focused={focusIndex===i}>
                {letter}
              </LetterBox>
            })}
          </WordBox>
        }
      </div>
    </div>
  )
}