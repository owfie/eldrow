import React from 'react'
import styles from './LetterBox.module.scss'

interface LetterBoxProps {
  children?: React.ReactNode
  grade?: Grade
  focused?: boolean
  onClick?: () => void
}

export type Grade = 'yes' | 'almost' | 'no' | undefined

const getGradeClassName = (grade: Grade) => {
  switch(grade) {
    case 'yes': return styles.yes
    case 'almost': return styles.almost
    case 'no': return styles.inactive
    default: return undefined
  }
}

export const LetterBox: React.FC<LetterBoxProps> = (props) => {
  const {children, grade, focused, onClick} = props

  const [blinking, setBlinking] = React.useState(focused)

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setBlinking(blinking => !blinking)
    }, 700)
  }, [blinking, setBlinking])

  return <div onClick={onClick} className={`${styles.LetterBox} ${getGradeClassName(grade)}`}>
    {children}
    {focused && blinking && <div className={styles.focused}></div>}
  </div>
}

export const WordBox: React.FC<LetterBoxProps> = (props) => {

  const [cursorPosition, setCursorPosition] = React.useState(0)
  

  const {children} = props
  return <div className={styles.WordBox}>{children}</div>
}