import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { GameProvider } from 'components/GameContext';
import { KeyProvider } from 'components/KeyContext';
import { AppStateProvider } from 'utils/appState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <KeyProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </KeyProvider>
    </AppStateProvider>
  )
}

export default MyApp
