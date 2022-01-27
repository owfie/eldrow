import type { NextPage } from 'next'
import { LetterBox, WordBox } from '../components/LetterBox'
import styles from '../styles/Home.module.css'

const lettersPerWord = 5
const wordsPerRound = 5

const Home: NextPage = () => {
  return (
    <div>
      <WordBox>
        <LetterBox grade={'yes'}>H</LetterBox>
        <LetterBox grade={'no'}>H</LetterBox>
        <LetterBox grade={'almost'}>H</LetterBox>
        <LetterBox >H</LetterBox>
        <LetterBox >H</LetterBox>
      </WordBox>
    </div>
  )
}

export default Home
