import { useRouter } from "next/router"
import React, { useContext } from "react"
import { useEffect } from "react"
import NoScrollLink from "./NoScrollLink"
import { Rainbow } from "./Rainbow"

import styles from "./Header.module.scss"
import { Toggle } from "./Toggle"
import { AppStateContext } from "utils/appState"
import { AppStateActionType } from "utils/appStateReducer"

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
        <Toggle label="Hardcore" checked={state.settings.hardMode} onClick={() => { dispatch && dispatch({ type: AppStateActionType.TOGGLE_HARD_MODE }) }}></Toggle>
        <Toggle label="Dark" checked={state.settings.darkMode} onClick={() => { dispatch && dispatch({ type: AppStateActionType.TOGGLE_DARK_MODE }) }}></Toggle>
      </nav>
      <div className={`${styles.divider}`}>
        <Rainbow collapsed={currentPage === "/"} revealDirection="right" />
      </div>
    </div>
  )
}
