
import * as React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
/* import theme from '../src/theme'; */
import createEmotionCache from '../src/createEmotionCache';
import { useEffect } from 'react'
import '../styles/globals.css'
import { Store, StoreProvider } from '../context/Store'
import { createTheme } from '@material-ui/core';
import Lay from '../components/Lay';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
 /*  const { state } = useContext(Store)
  console.log(state)
  const { darkMode } = state; // Change palette color depends on its value
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0'
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0'
      },
      body1: {
        fontWeight: 'normal'
      },

    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#e00e0e'
      },
      secondary: {
        main: '#fff'
      }
    }
  }) */
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider >
        <Head>
          <title>Umbrella Merchandise</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Lay>

          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </Lay>

      </StoreProvider>
    </CacheProvider>

  )
}

export default MyApp
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};