import { Button, List, ListItem, TextField, Typography, Link } from "@material-ui/core"
import Layout from "../components/Layout"
import { useStyles } from "../utils/styles"
import NextLink from 'next/link'
import axios from "axios"
import { useContext, useEffect } from "react"
import { Store } from "../context/Store"
import { useRouter } from 'next/router'
import Cookies from "js-cookie"
import { useSnackbar } from "notistack" // Pop-up messages
import { Controller, useForm } from "react-hook-form"

function Login() {
    const classes = useStyles()
    const { handleSubmit, control, formState: { errors } } = useForm();
    const router = useRouter()
    const { redirect } = router.query; // login?redirect=/shipping in case a page redirect here to login
    // Context-API Access
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useEffect(() => {
        if (userInfo) {
            // If is active user then Redirect Home page
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitHandler = async ({ email, password }) => {
        closeSnackbar() // Remove previous Pop-up message
        try {
            // console.log(router)
            const { data } = await axios.post('/api/users/login', { email, password })
            // SAVING THE RETURNED DATA (OBJECT) INTO GLOBAL STATE (CONTEXT)
            dispatch({ type: 'USER_LOGIN', payload: data })
            Cookies.set('userInfo', JSON.stringify(data))
            router.push(redirect || '/')
        } catch (error) {
            // console.log('ERROR', error.response)
            enqueueSnackbar(error.response.data ? error.response.data.message : error.message, { variant: 'error' })
        }
    }

    return (
        <Layout title="login ">
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    {/* Controller provided by react-hook-form */}
                    <ListItem>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                            }}
                            render={({ field }) => (
                                <TextField variant="outlined"
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="email"
                                    label="E-mail"
                                    inputProps={{ type: 'email' }}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email ? errors.email.type === 'pattern' ? 'E-mail not valid' : 'Email is required' : ''}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                                // pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/
                            }}
                            render={({ field }) => (
                                <TextField variant="outlined"
                                    autoComplete="on"
                                    {...field}
                                    fullWidth
                                    id="password"
                                    label="password"
                                    inputProps={{ type: 'password' }}
                                    error={Boolean(errors.password)} helperText={errors.password ? errors.password.type === 'minLength' ? 'E-mail requires at least 8 characters, 1 uppercase character, 1 lower case character and 1 special character' : 'Password is required' : ''}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">LOGIN</Button>
                    </ListItem>
                    <ListItem>
                        Don&rsquo;t have an account yet?<NextLink href={`/register?redirect=${redirect || '/'}`} passHref><Link>-Click here</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Login
