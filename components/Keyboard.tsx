import { PressedKeyContext } from 'pages'
import React from 'react'
import styles from './Keyboard.module.scss'
import { Grade } from './LetterBox'

interface KeyboardProps { 
}
const row1 = ['q','w','e','r','t','y','u','i','o','p']
const row2 = ['a','s','d','f','g','h','j','k','l']
const row3 = ['z','x','c','v','b','n','m']

const backspace = '←'
const submit = '✓'

const renderKeys = (row: string[]) => {
  return row.map((letter, i) => {
    return <Key keyName={letter} key={`${letter}-${i}`} />
  })
}

export const Keyboard: React.FC<KeyboardProps> = (props) => {
  const {} = props
  
  return <div className={styles.Keyboard}>
    <div className={styles.row}>{renderKeys(row1)}</div>
    <div className={styles.row}>
      <span style={{marginRight: '4em'}}><Key keyName="Enter" override={submit}></Key></span>
      {renderKeys(row2)}
      <span style={{marginLeft: '3.5em'}}><Key keyName="Backspace" override={backspace}></Key></span>
    </div>
    <div className={styles.row}>{renderKeys(row3)}</div>
  </div>
}

interface KeyProps {
  keyName: string
  state?: Grade
  override?: string
}

const Key: React.FC<KeyProps> = (props) => {
  const { keyName: letter, override } = props

  const key = React.useContext(PressedKeyContext)

  const pressed = key === letter

  return <div key={key}className={`${styles.Key} ${pressed && styles.active}`}>{override ?? letter}</div>
}