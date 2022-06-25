import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { KeyProvider } from 'components/KeyContext';
import { AppStateProvider } from 'utils/appState';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Header } from 'components/Header';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AppStateProvider>
      <KeyProvider>
        <Head>
          <title>eldroW</title>
        </Head>
        <Header />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} />
        </AnimatePresence>
      </KeyProvider>
    </AppStateProvider>
  )
}

export default MyApp
