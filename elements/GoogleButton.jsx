import * as React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Store } from '../context/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
function GoogleButton() {
    const router = useRouter()
    const { redirect } = router.query; // login?redirect=/shipping in case a page redirect here to login
    const { enqueueSnackbar } = useSnackbar()
    const { dispatch } = React.useContext(Store)

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const signInWithGoogleHandler = async () => {
        signInGoogle().then(async (user) => {
            try {
                // user.user to get access its credentials
                const { data } = await axios.post('/api/users/registerGoogle', user.user)
                // console.log('Backend response:', data)
                // SAVING THE RETURNED DATA (OBJECT) INTO GLOBAL STATE (CONTEXT)
                dispatch({ type: 'USER_LOGIN_GOOGLE', payload: data })
                enqueueSnackbar('Success registed', { variant: 'success' })
                Cookies.set('userInfo', JSON.stringify(data))
                return router.push(redirect || '/')
            } catch (error) {
                // console.log(error.response)
                enqueueSnackbar('Looks like this E-mail is unavailable', { variant: 'error' })
            }
        })
            .catch((error) => {
                enqueueSnackbar('Error sign in with Google, try another method', { variant: 'error' })
                // console.log(error)
            })
    }

    return (
        <Button onClick={signInWithGoogleHandler} variant="outlined" startIcon={<GoogleIcon />}>
            Sign Up With Google Account
        </Button>
    )
}

export default GoogleButton
