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

  const [attempts, setAttempts] = React.useState<attempts>([])
  const [word, setWord] = React.useState<word>(['', '', '', '', ''])
  const [input, setInput] = React.useState<input>(['', '', '', '', ''])
  const [focusIndex, setFocusIndex] = React.useState<focusIndex>(0)

  const activeKey = React.useContext(PressedKeyContext)

  const dispatchBackspace = React.useCallback(() => {
    setInput(input => {
      const newInput = [...input]
      newInput[focusIndex] = ''
      return newInput
    })
    if (focusIndex > 0) {
      setFocusIndex(focusIndex => focusIndex - 1)
    }
  }, [focusIndex])

  const dispatchInput = React.useCallback((key: string) => {
    setInput(input => {
      const newInput = [...input]
      newInput[focusIndex] = key
      return newInput
    })
    if (focusIndex < lettersPerWord - 1) {
      setFocusIndex(focusIndex => focusIndex + 1)
    }
  }, [focusIndex, setFocusIndex])

  React.useEffect(() => {
    if (activeKey) {

      if (activeKey === 'Backspace') {
        dispatchBackspace()
      } else if(activeKey === 'Enter') {
        // submit
        alert('submit')

      } else {
        dispatchInput(activeKey)
      }
    }
  }, [activeKey, dispatchInput, dispatchBackspace])

  return (
    <div>
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
