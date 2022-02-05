import { Keyboard } from 'components/Keyboard'
import {KeyProvider} from 'components/KeyProvider'
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
        <WordBox>
          <LetterBox grade={'yes'}></LetterBox>
          <LetterBox grade={'no'}></LetterBox>
          <LetterBox grade={'almost'}></LetterBox>
          <LetterBox focused ></LetterBox>
          <LetterBox ></LetterBox>
        </WordBox>
        <Keyboard />
      </KeyProvider>
    </div>
  )
}

export default Home
