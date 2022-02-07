import styles from './Flash.module.scss'

interface FlashProps {
  hidden?: boolean
}

export const Flash: React.FC<FlashProps> = ({hidden}) => {
  return <div className={`${styles.Flash} ${hidden && styles.hidden}`}></div>
}