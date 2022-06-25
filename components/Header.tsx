import { useRouter } from "next/router"
import React, { useContext } from "react"
import { useEffect } from "react"
import NoScrollLink from "./NoScrollLink"
import { Rainbow } from "./Rainbow"

import styles from "./Header.module.scss"
import { Toggle } from "./Toggle"
import { AppStateContext } from "utils/appState"
import { AppStateActionType } from "utils/appStateReducer"
import { AnimatePresence, motion } from "framer-motion"

export const Header: React.FC = () => {

  const { asPath, isReady } = useRouter()
  const [currentPage, setCurrentPage] = React.useState('/')
  const { state, dispatch } = useContext(AppStateContext)

  useEffect(() => {
    if (isReady) {
      const activePathname = new URL(asPath, location.href).pathname
      
      switch (activePathname) {
        case '/':
          setCurrentPage('/')
          break
        case '/about':
          setCurrentPage('/about')
          break
        case '/stats':
          setCurrentPage('/stats')
          break
        default:
          setCurrentPage('/')
          break
      }
    }
  }, [asPath, isReady])

  return (
    <div className={styles.Header}>
      <div className={styles.logo}>
        <NoScrollLink href="/">eldroW</NoScrollLink>
        <Rainbow revealDirection="up" collapsed={currentPage !== "/"} />
      </div>
      <nav>
        <NoScrollLink href="/stats">
          <a className={`${currentPage === "/stats" && styles.active}`}>
            Stats
          </a>
        </NoScrollLink>
        <NoScrollLink href="/about">
          <a className={`${currentPage === "/about" && styles.active}`}>About</a>
        </NoScrollLink>
        <motion.button
          className={styles.themeButton}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 0.9, rotate: 180 }}
          animate={{ rotate: 360 }}
          onClick={() => { dispatch && dispatch({ type: AppStateActionType.TOGGLE_DARK_MODE })}}
        >
          {state.settings.darkMode ? '🌙' : '🌞'}
        </motion.button>
      </nav>
      <div className={`${styles.divider}`}>
        <Rainbow collapsed={currentPage === "/"} revealDirection="right" />
      </div>
    </div>
  )
}
