import { PressedKeyContext } from 'pages'
import React from 'react'
import styles from './Keyboard.module.scss'
import { Grade } from './LetterBox'

interface KeyboardProps { 
}
const row1 = ['q','w','e','r','t','y','u','i','o','p']
const row2 = ['a','s','d','f','g','h','j','k','l']
const row3 = ['z','x','c','v','b','n','m']

const renderKeys = (row: string[]) => {
  return row.map((letter, i) => {
    return <Key letter={letter} key={`${letter}-${i}`} />
  })
}

export const Keyboard: React.FC<KeyboardProps> = (props) => {
  const {} = props
  
  return <div className={styles.Keyboard}>
    <div className={styles.row}>{renderKeys(row1)}</div>
    <div className={styles.row}>{renderKeys(row2)}</div>
    <div className={styles.row}>{renderKeys(row3)}</div>
  </div>
}

interface KeyProps {
  letter: string
  state?: Grade
}

const Key: React.FC<KeyProps> = (props) => {
  const { letter } = props

  const key = React.useContext(PressedKeyContext)

  const pressed = key === letter

  return <div key={key}className={`${styles.Key} ${pressed && styles.active}`}>{letter}</div>
}