import Head from 'next/head'
import Footer from '../components/Footer'
import { Container } from '@material-ui/core'
import Header from './Header'
import { useStyles } from '../utils/styles';

function Layout({ title, description, children }) {
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
