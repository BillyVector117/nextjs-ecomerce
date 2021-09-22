import Head from 'next/head'
import Footer from '../components/Footer'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import Header from './Header'
import { useStyles } from '../utils/styles';
import { useContext } from 'react';
import { Store } from '../context/Store';
function Layout({ title, description, children }) {
    const { state } = useContext(Store)
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
    })
    const classes = useStyles();
    return (
        <div>
            <Head>
                <title> {title ? `${title} - Umbrella merchandise | NextJS ` : 'Umbrella merchandise | NextJS '} </title>
                <meta name="description" content={description ? description : "Umbrella merchandise application"} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
                <Header />

                <Container className={classes.main}>
                    {children}
                </Container>
                <Footer />


        </div>
    )
}

export default Layout
