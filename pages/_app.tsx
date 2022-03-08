import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { KeyProvider } from 'components/KeyContext';
import { AppStateContext, AppStateProvider } from 'utils/appState';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <KeyProvider>
          <Component {...pageProps} />
      </KeyProvider>
    </AppStateProvider>
  )
}

export default MyApp
