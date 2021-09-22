import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
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
    primary: {
      main: '#e00e0e',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;