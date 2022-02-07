import styles from './Rainbow.module.scss'

interface RainbowProps {
  collapsed?: boolean
}

export const Rainbow: React.FC<RainbowProps> = ({ collapsed }) => {
  return <div className={styles.Rainbow}>
    <div className={`${styles.bar} ${collapsed && styles.collapsed}`}></div>
    <div className={`${styles.bar} ${collapsed && styles.collapsed}`}></div>
    <div className={`${styles.bar} ${collapsed && styles.collapsed}`}></div>
  </div>
}