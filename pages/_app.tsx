import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { GameProvider } from 'components/GameContext';
import { KeyProvider } from 'components/KeyContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <KeyProvider>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </KeyProvider>
  )
}

export default MyApp
