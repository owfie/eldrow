import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { LetterBox, WordBox } from '../components/LetterBox'
import styles from './Home.module.scss'
import { GameContext } from 'components/GameContext'
import { Heart } from 'components/HealthBar'
import { Rainbow } from 'components/Rainbow'
import { Toggle } from 'components/Toggle'
import { Chart } from 'components/Chart'
import app from '../firebase/clientApp'
import { getFirestore, doc, DocumentReference, getDoc } from 'firebase/firestore'

const data = [
  {
    label: '1',
    value: 1
  }, {
    label: '2',
    value: 3
  }, {
    label: '3',
    value: 2
  }, {
    label: '4',
    value: 1
  }, {
    label: '5',
    value: 4
  }, {
    label: '6',
    value: 0
  }
]

type FirestoreWord = {
  word: string
  date: string
}

import {DateTime} from 'luxon'
import { initializeWords } from 'utils/initializeWords'
import { page } from 'utils/types'
import { Game } from 'components/Game'

export async function getServerSideProps() {

  const db = getFirestore(app)

  const today = DateTime.now().setZone('Australia/Adelaide')
  const todayString = today.toFormat('yyyy-MM-dd')
  const tomorrow = today.plus({days: 1})

  type word = { word: string }

  const todayRef: DocumentReference<word> = doc(db, `words/${todayString}`) as DocumentReference<word>
 
  const word = (await (await getDoc(todayRef)).data() as word).word
  
  return {
    props: { firestoreWord: {
      word: word,
      date: todayString
    }},
  }
}

interface HomeProps {
  firestoreWord: FirestoreWord
}

const Home: NextPage<HomeProps> = (props) => {

  const { firestoreWord } = props

  const secret = firestoreWord.word

  const {gameOver} = React.useContext(GameContext)
  const [currentPage, setCurrentPage] = React.useState<page>('game')

  const [hardcoreMode, setHardcoreMode] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(false)

  return (
    <div className={styles.Home}>
      <Head>
        <title>eldroW</title>
      </Head>
      <div className={styles.header}>
        <div className={styles.logo}> 
          <a onClick={() => {setCurrentPage('game')}}>eldroW</a>
          <Rainbow revealDirection='up' collapsed={currentPage !== 'game'} />
        </div>
      </div>
      <div className={`${styles.divider}`}>
        <Rainbow collapsed={currentPage === 'game'} revealDirection='right'/>
      </div>
      {
        currentPage === 'game' &&
        <Game word={firestoreWord.word} />
      }
      {
        currentPage === 'about' &&
        <div className={styles.page}>
          <div className={styles.about}>
            <a onClick={() => {setCurrentPage('game')}} className={styles.back}>← Back to eldroW</a>
            <h2>About</h2>
            <p>
              Guess the <b>eldroW</b> in 6 tries!
            </p>
            <p>
              Each guess must be a valid 5 letter word. Hit the enter button to submit.
            </p>
            <span style={{paddingTop: '1em'}}>
              <WordBox>
                <LetterBox grade={'yes'}>h</LetterBox>
                <LetterBox grade={'almost'}>e</LetterBox>
                <LetterBox grade={'no'}>a</LetterBox>
                <LetterBox grade={'almost'}>v</LetterBox>
                <LetterBox grade={'no'}>y</LetterBox>
              </WordBox>
            </span>

            <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>

            <div className={styles.hintContainer}>
              <div className={styles.hint}>
                <LetterBox grade={'yes'}>h</LetterBox>
                <p>In the word and in the correct spot.</p>
              </div>
              <div className={styles.hint}>
                <LetterBox grade={'almost'}>e</LetterBox>
                <p>In the word, but in the wrong spot.</p>
              </div>
              <div className={styles.hint}>
                <LetterBox grade={'no'}>y</LetterBox>
                <p>Not in the word at all.</p>
              </div>  
            </div>
            <p><b>eldroW</b> is based on <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> by <a href="https://www.powerlanguage.co.uk/">Josh Wardle</a>.</p>
            <h2>Settings</h2>
            <div className={styles.toggleBar}>
              <Toggle checked={hardcoreMode} onClick={() => {setHardcoreMode(prev => !prev)}}></Toggle>
              <p>Hardcore Mode</p>
            </div>
            <div className={styles.toggleBar}>
              <Toggle checked={darkMode} onClick={() => {setDarkMode(prev => !prev)}}></Toggle>
              <p>Dark Mode</p>
            </div>
            <br />
          </div>
          <Footer />
        </div>
      }
      {
        currentPage === 'stats' &&
        <div className={styles.page}>
          <div className={styles.stats}>
            <a onClick={() => {setCurrentPage('game')}} className={styles.back}>← Back to eldroW</a>
            <h2>Stats</h2>
            <div className={styles.statRow}>
              <div className={styles.stat}>
                <h3>8</h3>
                <p>Played</p>
              </div>
              <div className={styles.stat}>
                <h3>100</h3>
                <p>Win %</p>
              </div>
              <div className={styles.stat}>
                <h3>1</h3>
                <p>Current Streak</p>
              </div>
              <div className={styles.stat}>
                <h3>5</h3>
                <p>Max Streak</p>
              </div>
            </div>
            <h2>Guess Distribution</h2>
            <Chart active='1' data={data}/>
            <h2>21:11:23</h2>
            <p>Until the next <b>eldroW</b></p>
          </div>
          <Footer />
        </div>
      }
    </div>
  )
}

const Footer = () => {
  return <div className={styles.footer}>
    <div>Made with <span style={{padding: '0 2px'}}><Heart /></span> in Adelaide</div>
    <a href="https://github.com/owfie">Alfie Edgeworth</a>
  </div>
}

// export async function getStaticProps() {
//   initializeWords()

//   return {
//     props: {
//     }
//   }
// }

export default Home
