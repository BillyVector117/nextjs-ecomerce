import { Button, List, ListItem, TextField, Typography, Link } from "@material-ui/core"
import Layout from "../components/Layout"
import { useStyles } from "../utils/styles"
import NextLink from 'next/link'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Store } from "../context/Store"
import { useRouter } from 'next/router'
import Cookies from "js-cookie"
function Login() {
    const router = useRouter()
    const { redirect } = router.query; // login?redirect=/shipping in case a page redirect here to login
    // Context-API Access
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            // If is active user then Redirect Home page
            router.push('/')
        }
    
        
    }, [])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles()
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            // console.log(router)
            const { data } = await axios.post('/api/users/login', { email, password })
            // SAVING THE RETURNED DATA (OBJECT) INTO GLOBAL STATE (CONTEXT)
            dispatch({ type: 'USER_LOGIN', payload: data })
            Cookies.set('userInfo', JSON.stringify(data))
            router.push(redirect || '/')
        } catch (error) {
            // console.log('ERROR', error.response)
            alert(error.response.data ? error.response.data.message : error.message)
        }
    }
    console.log('query', redirect)
    return (
        <Layout title="login ">
            <form onSubmit={submitHandler} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <TextField variant="outlined" autoComplete="on" onChange={(event) => { return setEmail(event.target.value) }} style={{ width: '100%' }} id="email" label="Email" inputProps={{ type: 'email' }} placeholder="Email">
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" autoComplete="on" onChange={(event) => { return setPassword(event.target.value) }} fullWidth id="password" label="password" inputProps={{ type: 'password' }}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">LOGIN</Button>
                    </ListItem>
                    <ListItem>
                        Don&rsquo;t have an account yet?<NextLink href="/register" passHref><Link>-Click here</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Login
