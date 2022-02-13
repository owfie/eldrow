import styles from './Toggle.module.scss'

interface ToggleProps {
  onClick: () => void
  checked?: boolean
}

export const Toggle: React.FC<ToggleProps> = (props) => {
  const {onClick, checked} = props

  return (
    <div onClick={onClick} className={`${styles.Toggle} ${checked && styles.active}`}>
      <div className={`${styles.inner}`}></div>
    </div>
  )
}