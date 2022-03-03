import React from "react"
import styles from './Game.module.scss'
import { LetterBox, WordBox } from "./LetterBox"

import { input, attempts, focusIndex, hint, attemptedLetter, word } from '../utils/types'
import { GameContext } from "./GameContext"
import { PressedKeyContext } from "./KeyContext"
import { words } from "words"
import { Hint } from "./Hint"
import { HealthBar } from "./HealthBar"
import { Keyboard } from "./Keyboard"

import { grade } from '../utils/types'
import { Flash } from "./Flash"

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

const lettersPerWord = 5
const wordsPerRound = 6

interface GameProps {
  word: string
}

export const Game: React.FC<GameProps> = (props) => {

  

  // Persistent Game State
  const { word: secret } = props
  const [attempts, setAttempts] = React.useState<attempts>([])

  // Safe State
  const [input, setInput] = React.useState<input>(['', '', '', '', ''])
  const [focusIndex, setFocusIndex] = React.useState<focusIndex>(0)
  const [hint, setHint] = React.useState<hint | undefined>(undefined)
  const [showFlash, setShowFlash] = React.useState<boolean>(false)
  const [lives, setLives] = React.useState<number>(wordsPerRound - attempts.length)

  const [attemptedLetters, setAttemptedLetters] = React.useState<attemptedLetter[]>([])

  const {gameOver, setGameOver} = React.useContext(GameContext)
  const {pressedKey: activeKey, setKey} = React.useContext(PressedKeyContext)

  React.useEffect(() => {
    if (activeKey) {
      setHint(hint => {return {text: hint?.text ?? '', hidden: true}})
    }
  }, [activeKey])

  React.useEffect(() => {
    if (hint && !hint.hidden) {

      setTimeout(() => 
        setHint(hint => {return {text: hint?.text ?? '', hidden: true}})
      , 5000)
    }
  }, [hint, setHint])

  const submitWord = React.useCallback((word: word) => {

    // If word contains an empty string, it's not a valid word.
    if (word.includes('')) {
      setHint({text: 'Looks like you\'ve missed a letter.', hidden: false})
      return
    }

    // If word is already in the attempts, it's not a valid word.
    if (attempts.includes(word)) {
      setHint({text: 'You\'ve already tried that.', hidden: false})
      return
    }

    // If word is not in the words list, it's not a valid word.
    if (!words.includes(word.join(''))) {
      setHint({text: 'Are you sure that\'s a word?', hidden: false})
      return
    }

    // If word is valid, add it to the attempts.
    setAttempts(attempts => [...attempts, word])
    const newAttemptedLetters = word.map((letter, i) => {
      return ({[letter]: getGrade(letter, i)})
    }) as attemptedLetter[]
    setAttemptedLetters([...attemptedLetters, ...newAttemptedLetters])

    // If word is the secret, end the game.
    if (word.join('') === secret) {
      setGameOver(true)
      setHint({text: getWinHint(lives), hidden: false})
      return
    }

    setLives(lives => lives - 1)

    // If no attempts remaining, end the game.
    if (attempts.length+1 === wordsPerRound) {
      setGameOver(true)
      const outputWord = secret.charAt(0).toUpperCase() + secret.slice(1).toLowerCase()
      setHint({text: `Game over! The word was ${outputWord}.`, hidden: false})
      return
    }
  
    setInput(input => {
      const newInput = [...input]
      newInput.fill('')
      return newInput
    })

    setFocusIndex(0)
  },[attempts, setGameOver])

  const dispatchBackspace = React.useCallback(() => {
    if (focusIndex <= lettersPerWord) {
      if (focusIndex === lettersPerWord || (input[focusIndex] === '' && focusIndex > 0)) {
        setInput(input => {
          const newInput = [...input]
          newInput[focusIndex-1] = ''
          return newInput
        })
        setFocusIndex(focusIndex => focusIndex - 1)
      } else {
        setInput(input => {
          const newInput = [...input]
          newInput[focusIndex] = ''
          return newInput
        })
      }
    }
  }, [focusIndex, input])

  const dispatchInput = React.useCallback((key: string) => {
    if (focusIndex < lettersPerWord) {
      setInput(input => {
        const newInput = [...input]
        newInput[focusIndex] = key
        return newInput
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

        if (focusIndex < lettersPerWord) {
          setFocusIndex(focusIndex => focusIndex + 1)
        }
      }
    }
  }, [activeKey, dispatchInput, dispatchBackspace, setKey, focusIndex, input, submitWord, gameOver])

  const getGrade: (l: string, p: number) => grade = (letter: string, position: number) =>{
    if (secret[position] === letter) return 'yes'
    if (secret.includes(letter)) return 'almost'
    return 'no'
  }

  React.useEffect(() => {
    if (attempts.length > 0) {
      setShowFlash(true)
      setTimeout(() => {
        setShowFlash(false)
      }, 100)
    }
  }, [attempts])

  return (
    <div className={styles.Game} style={{position:'relative'}}>
      {/* <Flash hidden={!showFlash}/> */}
      {
        hint!==undefined && 
        <Hint hidden={hint.hidden}>
          {hint.text}
        </Hint>
      }
      <div className={styles.gui}>
        <HealthBar total={wordsPerRound} lives={lives}/>
        <Keyboard attemptedLetters={attemptedLetters}/>
      </div>
      <div className={styles.gameZone}>
        {attempts.map((attempt, index) => {
          return <WordBox key={index}>
            {attempt.map((letter, index) => (
              <LetterBox key={index} grade={getGrade(letter, index)}>
                {letter}
              </LetterBox>
            ))}
          </WordBox>
        })}
        {!gameOver && 
        <WordBox>
            {input.map((letter, i) => {
              return <LetterBox onClick={() => setFocusIndex(i)} key={`input-${i}`} focused={focusIndex===i}>
                {letter}
              </LetterBox>
            })}
          </WordBox>
        }
      </div>
    </div>
  )
}