import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { LetterBox, WordBox } from '../components/LetterBox'
import styles from './Home.module.scss'
import { Heart } from 'components/HealthBar'
import { Rainbow } from 'components/Rainbow'
import { Toggle } from 'components/Toggle'
import { Chart } from 'components/Chart'
import { db } from '../firebase/clientApp'
import { doc, DocumentReference, getDoc } from 'firebase/firestore'

import {DateTime} from 'luxon'
import { FirestoreWord, page, SavedGame } from 'utils/types'
import { Game } from 'components/Game'
import { AppStateContext } from 'utils/appState'
import { AppStateActionType } from 'utils/appStateReducer'
import { Layout } from 'components/Layout'

export async function getServerSideProps() {

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

  const { state, dispatch } = React.useContext(AppStateContext)

  const savedGame = state.loaded ? (state.gameHistory.find(g => g.date === firestoreWord.date)
   ?? {
    gameOver: false,
    date: firestoreWord.date,
    secret: firestoreWord.word.split(''),
    attempts: [],
    solvedRetroactively: false
  } as SavedGame) : undefined

  const [currentPage, setCurrentPage] = React.useState<page>('game')

  return (
    <Layout>
      <div className={styles.Home}>
        {
          savedGame &&
          <Game savedGame={savedGame} />
        }
      </div>
    </Layout>
  )
}

// export async function getStaticProps() {
//   initializeWords()

//   return {
//     props: {
//     }
//   }
// }

export default Home
