import { useEffect } from 'react'
import '../styles/globals.css'
import {StoreProvider} from '../context/Store'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove CSS from SSR
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return (
    <StoreProvider>
      <Component {...pageProps} >

      </Component>
    </StoreProvider>
  )
}

export default MyApp
