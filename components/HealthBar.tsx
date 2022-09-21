import styles from './HealthBar.module.scss'

interface HealthBarProps {
  lives: number
  total: number
}

export const HealthBar: React.FC<HealthBarProps> = ({lives, total}) => {
  return (
    <div className={styles.HealthBar}>	
      {
        Array(lives).fill(0).map((_, i) => <div key={i} className={styles.heart}>	
            <Heart active />
          </div>
        )
      }
      {
        Array(total-lives).fill(0).map((_, i) => <div key={i} className={`${styles.used} ${styles.heart}`}>	
            <Heart />
          </div>
        )
      }
    </div>
  )
}

interface HeartProps {
  active?: boolean
}

export const Heart: React.FC<HeartProps> = (props) => {
  const { active } = props
  return <span className={`${styles.heart} ${active && styles.active}`}>&#9829;</span>
}