import styles from './LetterBox.module.scss'

interface LetterBoxProps {
  children?: React.ReactNode
  grade?: Grade
}

type Grade = 'yes' | 'almost' | 'no' | undefined

const getGradeClassName = (grade: Grade) => {
  switch(grade) {
    case 'yes': return styles.yes
    case 'almost': return styles.almost
    case 'no': return styles.no
    default: return undefined
  }
}

export const LetterBox: React.FC<LetterBoxProps> = (props) => {
  const {children, grade} = props
  return <div className={`${styles.LetterBox} ${getGradeClassName(grade)}`}>{children}</div>
}

export const WordBox: React.FC<LetterBoxProps> = (props) => {
  const {children} = props
  return <div className={styles.WordBox}>{children}</div>
}