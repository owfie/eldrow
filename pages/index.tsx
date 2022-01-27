import { Keyboard } from 'components/Keyboard'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { LetterBox, WordBox } from '../components/LetterBox'
import styles from './Home.module.scss'

const lettersPerWord = 5
const wordsPerRound = 5

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
        <title>Eldrow</title>
      </Head>
      <div className={styles.header}>
      <h1>Eldrow</h1>
<div>Settings</div>
      </div>
      
      <PressedKeyContext.Provider value={pressedKey}>
        <WordBox>
          <LetterBox grade={'yes'}>H</LetterBox>
          <LetterBox grade={'no'}>E</LetterBox>
          <LetterBox grade={'almost'}>L</LetterBox>
          <LetterBox >L</LetterBox>
          <LetterBox >O</LetterBox>
        </WordBox>
        <Keyboard />
      </PressedKeyContext.Provider>
    </div>
  )
}

export default Home
