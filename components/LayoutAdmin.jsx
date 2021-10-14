import { Container } from '@mui/material';
import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './sidebar/Sidebar';
import CustomButton from '../elements/CustomButton'
function LayoutAdmin({ title, description, children, currentSection }) {

    return (
        <div>
            <Head>
                <title> {title ? `${title} - Umbrella merchandise | NextJS ` : 'Umbrella merchandise | NextJS '} </title>
                <meta name="description" content={description ? description : "Umbrella merchandise application"} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title="Shopp App Admin" />
            <div className="container">

                <Sidebar currentSection={currentSection} />
                <Container>

                    <CustomButton />
                    {children}
                </Container>
            </div>


            <Footer />
        </div>
    )
}

export default LayoutAdmin
