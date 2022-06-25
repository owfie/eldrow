import { Layout } from "components/Layout"
import { LetterBox, WordBox } from "components/LetterBox"
import { Page } from "components/Page"
import { Toggle } from "components/Toggle"
import { NextPage } from "next/types"
import { useContext } from "react"
import { AppStateContext } from "utils/appState"
import { AppStateActionType } from "utils/appStateReducer"

import styles from './About.module.scss'

const About: NextPage = () => {
  
  return (
    <Layout>
      <Page title="About">
        <div className={styles.About}>
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
          <br />
        </div>
      </Page>
    </Layout>
  )
}

export default About