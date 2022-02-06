import { Keyboard } from 'components/Keyboard'
import {KeyProvider, PressedKeyContext} from 'components/KeyProvider'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { LetterBox, WordBox } from '../components/LetterBox'
import styles from './Home.module.scss'
import { words } from '../words'

const lettersPerWord = 5
const wordsPerRound = 6

const secret = 'react'

type word = string[]
type attempts = string[]
type focusIndex = number
type input = string[]

const Home: NextPage = () => {

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
        <Game />
        <Keyboard />
      </KeyProvider>
    </div>
  )
}

// import fs from 'fs'

// export async function getStaticProps() {

//   const path = process.cwd()

//   const filePath = path + '/swords.txt'
//   const exportPath = path + '/words.ts'

//   const words = fs.readFileSync(filePath, 'utf8').split('\n')

//   fs.writeFileSync(exportPath, `export const words = ${JSON.stringify(words)}`)
//   return {
//     props: {
//     },
//   };
// }
// 
export const Game: React.FC = () => {

  const [attempts, setAttempts] = React.useState<attempts>([])
  const [input, setInput] = React.useState<input>(['', '', '', '', ''])
  const [focusIndex, setFocusIndex] = React.useState<focusIndex>(0)

  const {pressedKey: activeKey, setKey} = React.useContext(PressedKeyContext)

  const submitWord = React.useCallback((word: word) => {

    // if word contains an empty string, it's not a valid word
    if (word.includes('')) {
      alert('incomplete word')
      return
    }

    // if word is already in the attempts, it's not a valid word
    if (attempts.includes(word.join(''))) {
      alert('already tried that')
      return
    }

    // if word is not in the words list, it's not a valid word
    if (!words.includes(word.join(''))) {
      alert('not a valid word')
      return
    }

    // if word is valid, add it to the attempts
    setAttempts(attempts => [...attempts, word.join('')])

    // if word is the secret, end the game
    if (word.join('') === secret) {
      alert('you won!')
      setGameOver(true)
      // end game
    }
  
    // set input to empty
    setInput(input => {
      const newInput = [...input]
      newInput.fill('')
      return newInput
    })
    // set focus to 0
    setFocusIndex(0)
  },[attempts])

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
        submitWord(input)
        setKey(undefined)


      } else {
        dispatchInput(activeKey)
        setKey(undefined)
        if (focusIndex < lettersPerWord) {
          setFocusIndex(focusIndex => focusIndex + 1)
        }
      }
    }
  }, [activeKey, dispatchInput, dispatchBackspace, setKey, focusIndex, input, submitWord])

  const getGrade = (letter: string, position: number) => {
    if (secret[position] === letter) return 'yes'
    if (secret.includes(letter)) return 'almost'
    return 'no'
  }

  const [gameOver, setGameOver] = React.useState(false)

  return (
    <div>
      {attempts.map((attempt, index) => {
        const word = attempt.split('')
        return <WordBox key={index}>
          {word.map((letter, index) => (
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
  )
}

export default Home
