import styles from './Toggle.module.scss'

interface ToggleProps {
  onClick: () => void
  checked?: boolean
  label: string
}

export const Toggle: React.FC<ToggleProps> = (props) => {
  const {onClick, checked, label} = props

  return (
    <div className={styles.ToggleFrame}>
      <div onClick={onClick} className={`${styles.Toggle} ${checked && styles.active}`}>
        <div className={`${styles.inner}`}></div>
      </div>
      <label>
        {label}
      </label>
    </div>
  )
}