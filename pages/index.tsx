import { Keyboard } from 'components/Keyboard'
import {PressedKeyContext} from 'components/KeyContext'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { LetterBox, WordBox } from '../components/LetterBox'
import styles from './Home.module.scss'
import { words } from '../words'
import { GameContext } from 'components/GameContext'
import { HealthBar, Heart } from 'components/HealthBar'
import { Rainbow } from 'components/Rainbow'
import { Hint } from 'components/Hint'
import { Flash } from 'components/Flash'
import { Toggle } from 'components/Toggle'
import { Chart } from 'components/Chart'

const lettersPerWord = 5
const wordsPerRound = 6

const secret = 'react'

type word = string[]
type attempts = string[]
type focusIndex = number
type input = string[]

type page = 'game' | 'stats' | 'about'

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

const Home: NextPage = () => {

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
        <nav>
          <a className={`${currentPage==='stats' && styles.active}`} onClick={() => {setCurrentPage('stats')}}>Stats</a>
          <a className={`${currentPage==='about' && styles.active}`} onClick={() => {setCurrentPage('about')}}>About</a>
        </nav>
      </div>
      <div className={`${styles.divider}`}>
        <Rainbow collapsed={currentPage === 'game'} revealDirection='right'/>
      </div>
      {
        currentPage === 'game' &&
        <Game />
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

const getWinHint = (livesLeft: number) => {
  switch (livesLeft) {
    case 1: return 'Phew!';
    case 2: return 'Nice!';
    case 3: return 'Good job!';
    case 4: return 'Great work!';
    case 5: return 'Wow!';
    default: return 'Uhhh... this is awkward.';
  }
}

type Hint = {
  text: string
  hidden: boolean
}

export const Game: React.FC = () => {

  const [attempts, setAttempts] = React.useState<attempts>([])
  const [input, setInput] = React.useState<input>(['', '', '', '', ''])
  const [focusIndex, setFocusIndex] = React.useState<focusIndex>(0)
  const [hint, setHint] = React.useState<Hint | undefined>(undefined)
  const [showFlash, setShowFlash] = React.useState<boolean>(false)
  const [lives, setLives] = React.useState<number>(wordsPerRound)

  const {gameOver, setGameOver} = React.useContext(GameContext)
  const {pressedKey: activeKey, setKey} = React.useContext(PressedKeyContext)

  React.useEffect(() => {
    if (activeKey) {
      setHint(hint => {return {text: hint?.text ?? '', hidden: true}})
    }
  }, [activeKey])

  React.useEffect(() => {
    if (hint && !hint.hidden) {

      setTimeout(() => 
        setHint(hint => {return {text: hint?.text ?? '', hidden: true}})
      , 5000)
    }
  }, [hint, setHint])

  const submitWord = React.useCallback((word: word) => {

    // If word contains an empty string, it's not a valid word.
    if (word.includes('')) {
      setHint({text: 'Looks like you\'ve missed a letter.', hidden: false})
      return
    }

    // If word is already in the attempts, it's not a valid word.
    if (attempts.includes(word.join(''))) {
      setHint({text: 'You\'ve already tried that.', hidden: false})
      return
    }

    // If word is not in the words list, it's not a valid word.
    if (!words.includes(word.join(''))) {
      setHint({text: 'Are you sure that\'s a word?', hidden: false})
      return
    }

    // If word is valid, add it to the attempts.
    setAttempts(attempts => [...attempts, word.join('')])

    // If word is the secret, end the game.
    if (word.join('') === secret) {
      setGameOver(true)
      setHint({text: getWinHint(lives), hidden: false})
      return
    }

    setLives(lives => lives - 1)

    // If no attempts remaining, end the game.
    if (attempts.length+1 === wordsPerRound) {
      setGameOver(true)
      const outputWord = secret.charAt(0).toUpperCase() + secret.slice(1).toLowerCase()
      setHint({text: `Game over! The word was ${outputWord}.`, hidden: false})
      return
    }
  
    setInput(input => {
      const newInput = [...input]
      newInput.fill('')
      return newInput
    })

    setFocusIndex(0)
  },[attempts, setGameOver])

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
        if(!gameOver) submitWord(input)
        setKey(undefined)
        
      } else {
        dispatchInput(activeKey)
        setKey(undefined)

        if (focusIndex < lettersPerWord) {
          setFocusIndex(focusIndex => focusIndex + 1)
        }
      }
    }
  }, [activeKey, dispatchInput, dispatchBackspace, setKey, focusIndex, input, submitWord, gameOver])

  const getGrade = (letter: string, position: number) => {
    if (secret[position] === letter) return 'yes'
    if (secret.includes(letter)) return 'almost'
    return 'no'
  }

  React.useEffect(() => {
    if (attempts.length > 0) {
      setShowFlash(true)
      setTimeout(() => {
        setShowFlash(false)
      }, 100)
    }
  }, [attempts])

  return (
    <div className={styles.game} style={{position:'relative'}}>
      {/* <Flash hidden={!showFlash}/> */}
      {
        hint!==undefined && 
        <Hint hidden={hint.hidden}>
          {hint.text}
        </Hint>
      }
      <div className={styles.gui}>
        <HealthBar total={wordsPerRound} lives={lives}/>
        <Keyboard />
      </div>
      <div className={styles.gameZone}>
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
    </div>
  )
}

export default Home
