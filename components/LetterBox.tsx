import React from 'react'
import styles from './LetterBox.module.scss'
import { grade } from '../utils/types'

interface LetterBoxProps {
  children?: React.ReactNode
  grade?: grade
  focused?: boolean
  onClick?: () => void
}

export const getGradeClassName = (grade: grade, styles: {
  readonly [key: string]: string;
}) => {
  switch(grade) {
    case 'yes': return styles.yes
    case 'almost': return styles.almost
    case 'no': return styles.inactive
    default: return undefined
  }
}

const getRandomRotationStyle = () => {
  return {
    transform: `rotate(${Math.floor(Math.random() * 20 - 10)}deg)`,
    transition: 'transform 0.2s ease-in-out'
  }
}

export const LetterBox: React.FC<LetterBoxProps> = (props) => {
  const {children, grade, focused, onClick} = props

  const [blinking, setBlinking] = React.useState(focused)

  React.useEffect(() => {
    if (focused) {
      setTimeout(() => {
        setBlinking(blinking => !blinking)
      }, 700)
    }
  }, [blinking, setBlinking, focused])

  return <div style={grade !== 'no' && grade ? getRandomRotationStyle() : undefined} onClick={onClick} className={`${styles.LetterBox} ${getGradeClassName(grade, styles)}`}>
    <div className={styles.inside}>{children}</div>
    {focused && blinking && <div className={styles.focused}></div>}
  </div>
}

export const WordBox: React.FC<LetterBoxProps> = (props) => {

  const [cursorPosition, setCursorPosition] = React.useState(0)
  

  const {children} = props
  return <div className={styles.WordBox}>{children}</div>
}