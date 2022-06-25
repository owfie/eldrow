import styles from './Footer.module.scss'
import { Heart } from './HealthBar'

const Footer = () => {
  return <div className={styles.Footer}>
    <div>Made with <span style={{padding: '0 2px'}}><Heart /></span> in Adelaide</div>
    <a href="https://github.com/owfie">Alfie Edgeworth</a>
  </div>
}

export default Footer