import { Keyboard } from 'components/Keyboard'
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

export const PressedKeyContext = React.createContext<string | undefined>(undefined)

const Home: NextPage = () => {

  const [pressedKey, setPressedKey] = React.useState<string | undefined>(undefined)

  const handleKeyPress = React.useCallback((e: KeyboardEvent) => {
    const letter = e.key
    setPressedKey(letter)
  }, [])

  const handleKeyRelease = React.useCallback(() => {
    setPressedKey(undefined)
  }, [])

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    document.addEventListener("keyup", handleKeyRelease, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);

      document.removeEventListener("keyup", handleKeyRelease, false);
    };
  }, [handleKeyPress, handleKeyRelease]);

  return (
    
    <div className={styles.Home}>
      <Head>
        <title>eldroW</title>
      </Head>
      <div className={styles.header}>
      <h1>eldroW</h1>
<div>Settings</div>
      </div>
      
      <PressedKeyContext.Provider value={pressedKey}>
        <WordBox>
          <LetterBox grade={'yes'}></LetterBox>
          <LetterBox grade={'no'}></LetterBox>
          <LetterBox grade={'almost'}></LetterBox>
          <LetterBox focused ></LetterBox>
          <LetterBox ></LetterBox>
        </WordBox>
        <Keyboard />
      </PressedKeyContext.Provider>
    </div>
  )
}

export default Home
