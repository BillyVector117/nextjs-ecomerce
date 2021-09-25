import { createTheme, ThemeProvider } from "@material-ui/core"
import { useContext } from "react";
import { Store } from "../context/Store";

function Lay({ children }) {
  const { state } = useContext(Store)
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
  })
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Lay
