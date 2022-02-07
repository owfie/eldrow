import styles from './Rainbow.module.scss'

interface RainbowProps {
  collapsed?: boolean
  revealDirection?: 'up' | 'right'
}

export const Rainbow: React.FC<RainbowProps> = ({ collapsed, revealDirection }) => {
  return <div className={styles.Rainbow}>
    <div className={`${styles.bar} ${collapsed && styles.collapsed}`}></div>
    <div className={`${styles.bar} ${collapsed && styles.collapsed}`}></div>
    <div className={`${styles.bar} ${collapsed && styles.collapsed}`}></div>
  </div>
}