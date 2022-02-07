import { Keyboard } from 'components/Keyboard'
import {PressedKeyContext} from 'components/KeyContext'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { LetterBox, WordBox } from '../components/LetterBox'
import styles from './Home.module.scss'
import { words } from '../words'
import { GameContext } from 'components/GameContext'
import { HealthBar } from 'components/HealthBar'
import { Rainbow } from 'components/Rainbow'
import { Hint } from 'components/Hint'
import { Flash } from 'components/Flash'

const lettersPerWord = 5
const wordsPerRound = 6

const secret = 'react'

type word = string[]
type attempts = string[]
type focusIndex = number
type input = string[]

type page = 'game' | 'stats' | 'about' | 'settings'

const Home: NextPage = () => {

  const {gameOver} = React.useContext(GameContext)
  const [currentPage, setCurrentPage] = React.useState<page>('game')

  return (
    <div className={styles.Home}>
      <Head>
        <title>eldroW</title>
      </Head>
      <div className={styles.header}>
        <div className={styles.logo}> 
          <a onClick={() => {setCurrentPage('game')}}><h1>eldroW</h1></a>
          <Rainbow revealDirection='up' collapsed={currentPage !== 'game'} />
        </div>
        <nav>
          <a className={`${currentPage==='stats' && styles.active}`} onClick={() => {setCurrentPage('stats')}}>Stats</a>
          <a className={`${currentPage==='about' && styles.active}`} onClick={() => {setCurrentPage('about')}}>About</a>
          <a className={`${currentPage==='settings' && styles.active}`} onClick={() => {setCurrentPage('settings')}}>Settings</a>
        </nav>
      </div>
      <div className={`${styles.divider}`}>
        <Rainbow collapsed={currentPage === 'game'} revealDirection='right'/>
      </div>
      {
        currentPage === 'game' &&
        <>
          <Game />
        </>
      }
      {
        currentPage === 'about' &&
        <>
        <a onClick={() => {setCurrentPage('game')}} className={styles.back}>← Back to eldroW</a>
        <div className={styles.about}>
          <p>
            Guess the <b>eldroW</b> in 6 tries!
          </p>
          <p>
            Each guess must be a valid 5 letter word. Hit the enter button to submit.
          </p>
          <br />
          <WordBox>
            <LetterBox grade={'yes'}>h</LetterBox>
            <LetterBox grade={'almost'}>e</LetterBox>
            <LetterBox grade={'no'}>a</LetterBox>
            <LetterBox grade={'almost'}>v</LetterBox>
            <LetterBox grade={'no'}>y</LetterBox>
          </WordBox>
          <br />
          <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
          <br />
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
          <br />
          <p><b>eldroW</b> is based on <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> by <a href="https://www.powerlanguage.co.uk/">Josh Wardle</a>.</p>
        </div>
          <Footer />
        </>
      }
      {
        currentPage === 'stats' &&
        <>
          <a onClick={() => {setCurrentPage('game')}} className={styles.back}>← Back to eldroW</a>
          <p>Hello world</p>
          <Footer />
        </>
      }
      {
        currentPage === 'settings' &&
        <>
          <a onClick={() => {setCurrentPage('game')}} className={styles.back}>← Back to eldroW</a>
          <p>Hardcore mode</p>
          <p>Dark mode</p>
          <Footer />
        </>
      }
    </div>
  )
}

const Footer = () => {
  return <div className={styles.footer}>
    <p>Made with <span className={styles.heart}>❤</span> in Adelaide</p>
    <p><a href="https://github.com/owfie">Alfie Edgeworth</a></p>
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
    case 3: return 'Good!';
    case 4: return 'Great!';
    case 5: return 'Awesome!';
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

  const {gameOver, setGameOver} = React.useContext(GameContext)
  const {pressedKey: activeKey, setKey} = React.useContext(PressedKeyContext)

  React.useEffect(() => {
    if (activeKey) {
      setHint(hint => {return {text: hint?.text ?? '', hidden: true}})
    }
  }, [activeKey])

  React.useEffect(() => {
    if (hint && hint.text !== '') {
      setTimeout(() => {
        setHint(hint => {return {text: hint?.text ?? '', hidden: true}})
      }, 5000)
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
      setHint({text: getWinHint(wordsPerRound - attempts.length), hidden: false})
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

  const [showFlash, setShowFlash] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (attempts.length > 0) {
      setShowFlash(true)
      setTimeout(() => {
        setShowFlash(false)
      }, 100)
    }
  }, [attempts])

  return (
    <div style={{position:'relative'}}>
      <Flash hidden={!showFlash}/>
      {
        hint!==undefined && 
        <Hint hidden={hint.hidden}>
          {hint.text}
        </Hint>
      }
      
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
      <HealthBar />
      <Keyboard />
    </div>
  )
}

export default Home
