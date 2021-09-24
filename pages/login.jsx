import { Button, List, ListItem, TextField, Typography, Link } from "@material-ui/core"
import Layout from "../components/Layout"
import { useStyles } from "../utils/styles"
import NextLink from 'next/link'

function Login() {
    const classes = useStyles()
    return (
        <Layout title="login ">
            <form className={classes.form}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <TextField variant="outlined" style={{ width: '100%' }} id="email" label="Email" inputProps={{ type: 'email' }}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth id="password" label="password" inputProps={{ type: 'password' }}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">LOGIN</Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account yet?<NextLink href="/register" passHref><Link>-Click here</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Login
