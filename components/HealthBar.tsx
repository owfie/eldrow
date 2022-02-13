import styles from './HealthBar.module.scss'

interface HealthBarProps {
  lives: number
  total: number
}

export const HealthBar: React.FC<HealthBarProps> = ({lives, total}) => {
  return <div className={styles.HealthBar}>	
{
  Array(lives).fill(0).map((_, i) => <div key={i} className={styles.heart}>	
  	
    &#9829;</div>)
}
{
  Array(total-lives).fill(0).map((_, i) => <div key={i} className={`${styles.used} ${styles.heart}`}>	
  	
    &#9829;</div>)
}
  </div>
}