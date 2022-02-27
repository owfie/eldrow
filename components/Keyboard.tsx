import { PressedKeyContext } from 'components/KeyContext'
import { attemptedLetter } from '../utils/types'
import React, { CSSProperties } from 'react'
import styles from './Keyboard.module.scss'
import { getGradeClassName } from './LetterBox'
import { grade } from '../utils/types'

interface KeyboardProps { 
  attemptedLetters: attemptedLetter[]
}
const row1 = ['q','w','e','r','t','y','u','i','o','p']
const row2 = ['a','s','d','f','g','h','j','k','l']
const row3 = ['z','x','c','v','b','n','m']

const backspace = '←'
const submit = '⏎'

const checkGrade: (letter: string, attempts: attemptedLetter[]) => grade = (letter, attemptedLetters) => {
  const letterAttempts = attemptedLetters.filter(attempt => attempt[letter])
  const bestAttempt = letterAttempts.find(attempt => attempt[letter] === 'yes') ?? letterAttempts.find(attempt => attempt[letter] === 'almost') ?? letterAttempts.find(attempt => attempt[letter] === 'no')
  return bestAttempt ? bestAttempt[letter] : undefined
}

const renderKeys = (row: string[], attemptedLetters: attemptedLetter[]) => {
  return row.map((letter, i) => {
    return <Key keyName={letter} key={`${letter}-${i}`} state={checkGrade(letter, attemptedLetters)} />
  })
}

export const getKeyClassName = (grade: grade) => {
  switch(grade) {
    case 'yes': return styles.yes
    case 'almost': return styles.almost
    case 'no': return styles.inactive
    default: return undefined
  }
}

export const Keyboard: React.FC<KeyboardProps> = (props) => {
  const {attemptedLetters} = props
  
  return <div className={styles.Keyboard}>
    <div className={styles.row}>{renderKeys(row1, attemptedLetters)}</div>
    <div className={styles.row}>{renderKeys(row2, attemptedLetters)}</div>
    <div className={styles.row}>
      <span style={{marginRight: '1.5em'}}><Key style={{width: '3em'}} keyName="Enter" override={submit}></Key></span>
      {renderKeys(row3, attemptedLetters)}
      <span style={{marginLeft: '1em'}}><Key style={{width: '3em'}} keyName="Backspace" override={backspace}></Key></span>
    </div>
  </div>
}

interface KeyProps {
  keyName: string
  state?: grade
  override?: string
  style?: CSSProperties
}

const Key: React.FC<KeyProps> = (props) => {
  const { keyName: letter, override , style, state} = props

  const { pressedKey: key, setKey } = React.useContext(PressedKeyContext)

  const pressed = key === letter

  return <div style={style} onClick={() => {setKey(letter)}} key={letter} className={`${styles.Key} ${pressed && styles.active} ${getGradeClassName(state, styles)}`}>{override ?? letter}</div>
}