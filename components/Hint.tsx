import styles from './Hint.module.scss'

interface HintProps {
  children: React.ReactNode
  hidden?: boolean
}

export const Hint: React.FC<HintProps> = (props) => {
  const { children, hidden } = props
  return <div className={`${styles.Hint} ${hidden && styles.hidden}`}>
    {children}
  </div>
}