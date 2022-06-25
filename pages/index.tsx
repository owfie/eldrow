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

  type word = { word: string | undefined }

  const todayRef: DocumentReference<word> = doc(db, `words/${todayString}`) as DocumentReference<word>
 
  const response = ((await getDoc(todayRef)))

  if (response.exists()) {
    return {
      props: {
        firestoreWord: {
          word: response.data().word,
          date: todayString,
        },
      },
    };
  } else {
    return {
      props: { firestoreWord: {
        date: todayString
      }},
    }
  }
}

interface HomeProps {
  firestoreWord: FirestoreWord
}

const Home: NextPage<HomeProps> = (props) => {

  const { firestoreWord } = props

  const { state, dispatch } = React.useContext(AppStateContext)

  const savedGame = (state.loaded && firestoreWord.word) ? (state.gameHistory.find(g => g.date === firestoreWord.date)
   ?? {
    gameOver: false,
    date: firestoreWord.date,
    secret: firestoreWord.word.split(''),
    attempts: [],
    solvedRetroactively: false
  } as SavedGame) : undefined

  const date = DateTime.fromFormat(firestoreWord.date, 'yyyy-MM-dd')
  const dateString = date.toFormat('d MMMM')

  return (
    <Layout>
      <div className={styles.Home}>
        {
          savedGame ? (
          <Game savedGame={savedGame} />
          ) : (
            <div>
              <h1>Uh oh.</h1>
              <p>Looks like we couldn&apos;t find a word for today&apos;s date ({dateString}). Try again tomorrow?</p>
            </div>
          )
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
