import { Keyboard } from 'components/Keyboard'
import {KeyProvider, PressedKeyContext} from 'components/KeyProvider'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { LetterBox, WordBox } from '../components/LetterBox'
import styles from './Home.module.scss'

const lettersPerWord = 5
const wordsPerRound = 6

const secret = 'react'

type word = string[]
type attempts = word[]
type focusIndex = number
type input = string[]

const Home: NextPage = () => {

  const [gameOver, setGameOver] = React.useState(false)

  return (
    
    <div className={styles.Home}>
      <Head>
        <title>Eldrow</title>
      </Head>
      <div className={styles.header}>
      <h1>Eldrow</h1>
      <div>Settings</div>
      </div>
      
      <KeyProvider>
        {!gameOver && <Game />}
        <Keyboard />
      </KeyProvider>
    </div>
  )
}

export const Game: React.FC = () => {

  const [attempts, setAttempts] = React.useState<attempts>([['t','r','a','c','k']])
  const [input, setInput] = React.useState<input>(['', '', '', '', ''])
  const [focusIndex, setFocusIndex] = React.useState<focusIndex>(0)

  const {pressedKey: activeKey, setKey} = React.useContext(PressedKeyContext)

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
        // submit
        alert('submit')

      } else {
        dispatchInput(activeKey)
        setKey(undefined)
        if (focusIndex < lettersPerWord) {
          setFocusIndex(focusIndex => focusIndex + 1)
        }
      }
    }
  }, [activeKey, dispatchInput, dispatchBackspace, setKey, focusIndex])

  const getGrade = (letter: string, position: number) => {
    if (secret[position] === letter) return 'yes'
    if (secret.includes(letter)) return 'almost'
    return 'no'
  }

  return (
    <div>
      <h1>{input}</h1>
      {attempts.map((word, index) => (
        <WordBox key={index}>
          {word.map((letter, index) => (
            <LetterBox key={index} grade={getGrade(letter, index)}>
              {letter}
            </LetterBox>
          ))}
        </WordBox>
      ))}
      <WordBox>
          {input.map((letter, i) => {
            return <LetterBox onClick={() => setFocusIndex(i)} key={`input-${i}`} focused={focusIndex===i}>
              {letter}
            </LetterBox>
          })}
        </WordBox>
    </div>
  )
}

export default Home
