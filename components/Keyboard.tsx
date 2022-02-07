import { PressedKeyContext } from 'components/KeyContext'
import React, { CSSProperties } from 'react'
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
    <div className={styles.row}>{renderKeys(row2)}</div>
    <div className={styles.row}>
      <span style={{marginRight: '1em'}}><Key style={{width: '3em'}} keyName="Enter" override={submit}></Key></span>
      {renderKeys(row3)}
      <span style={{marginLeft: '1em'}}><Key style={{width: '3em'}} keyName="Backspace" override={backspace}></Key></span>
    </div>
  </div>
}

interface KeyProps {
  keyName: string
  state?: Grade
  override?: string
  style?: CSSProperties
}

const Key: React.FC<KeyProps> = (props) => {
  const { keyName: letter, override , style} = props

  const { pressedKey: key, setKey } = React.useContext(PressedKeyContext)

  const pressed = key === letter

  return <div style={style} onClick={() => {setKey(letter)}} key={letter} className={`${styles.Key} ${pressed && styles.active}`}>{override ?? letter}</div>
}