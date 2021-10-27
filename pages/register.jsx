import { Button, List, ListItem, TextField, Typography, Link } from "@material-ui/core"
import Layout from "../components/Layout"
import { useStyles } from "../utils/styles"
import NextLink from 'next/link'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Store } from "../context/Store"
import { useRouter } from 'next/router'
import Cookies from "js-cookie"
import { useSnackbar } from "notistack";
import GoogleButton from "../elements/GoogleButton"

function Register() {
    const router = useRouter()
    const { redirect } = router.query; // login?redirect=/shipping in case a page redirect here to login
    // Context-API Access
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state;
    const messageName = 'Name field only accepts letters and blank spaces'
    const messageEmail = 'Incorrect E-mail, try again'
    const messagePassword = 'Password must have at least 8 characters'
    const messageConfirmPassword = 'Passwords must match'
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (userInfo) {
            // If is active user then Redirect Home page
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [errors, setErrors] = useState({ name: false, email: false, password: false, confirmPassword: false })
    const classes = useStyles()

    const submitHandler = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            enqueueSnackbar('password does not match', { variant: 'error' })
            alert('password does not match')
            return
        }
        try {
            // console.log(router)
            const { data } = await axios.post('/api/users/register', formData) // Returnsan user object with a valid token
            // SAVING THE RETURNED DATA (OBJECT) INTO GLOBAL STATE (CONTEXT)
            dispatch({ type: 'USER_LOGIN', payload: data })
            Cookies.set('userInfo', JSON.stringify(data))
            router.push(redirect || '/')
        } catch (error) {
            enqueueSnackbar('Try with another E-mail', { variant: 'error' })
        }
    }

    const handleChange = async (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const validateForm = (formData) => {
        // Define errors Object (fill for each new error)
        // Define regular expression for each input
        let countErrors = 0;
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        // let regexComments = /^.{1,255}$/;
        if (!formData.name.trim()) {
            setErrors({ ...errors, name: true })
            countErrors += 1
        } else if (!regexName.test(formData.name.trim())) {
            setErrors({ ...errors, name: true })
            countErrors += 1
        }
        if (!formData.email.trim()) {
            setErrors({ ...errors, email: true })
            countErrors += 1
        } else if (!regexEmail.test(formData.email.trim())) {
            setErrors({ ...errors, email: true })
            countErrors += 1
        }
        else if (formData.password.length < 8) {
            setErrors({ ...errors, password: true })
            countErrors += 1
        }
        else if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, confirmPassword: true })
            countErrors += 1
        }
        else if (!countErrors > 0) {
            countErrors = 0
            return setErrors({ name: false, email: false, password: false, confirmPassword: false })
        }
    }
    const onBlurHandler = async (event) => {
        handleChange(event)
        validateForm(formData)
    }

    return (
        <Layout title="Register ">
            <form onSubmit={submitHandler} className={classes.form}>
                <Typography component="h1" variant="h1">
                    <div className="title">
                        Register

                    </div>
                </Typography>
                <div className="signUpButtons">
                    <Typography component="h5" variant="h5">
                        Use your Google Account
                    </Typography>
                    <GoogleButton />
                </div>
                <List>
                    <ListItem>
                        <TextField error={errors.name} helperText={errors.name && messageName} variant="outlined" name="name" autoComplete="on" onChange={(event) => { return handleChange(event) }} onBlur={(event) => { onBlurHandler(event) }} style={{ width: '100%' }} id="name" label="Name" inputProps={{ type: 'name' }} placeholder="Name">
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <TextField error={errors.email} helperText={errors.email && messageEmail} variant="outlined" name="email" autoComplete="on" onChange={(event) => { return handleChange(event) }} onBlur={(event) => { onBlurHandler(event) }} style={{ width: '100%' }} id="email" label="Email" inputProps={{ type: 'email' }} placeholder="Email">
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <TextField error={errors.password} helperText={errors.password && messagePassword} variant="outlined" name="password" onChange={(event) => { return handleChange(event) }} onBlur={(event) => { onBlurHandler(event) }} fullWidth id="password" label="password" inputProps={{ type: 'password' }}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <TextField error={errors.confirmPassword} helperText={errors.confirmPassword && messageConfirmPassword} variant="outlined" name="confirmPassword" onChange={(event) => { return handleChange(event) }} onBlur={(event) => { onBlurHandler(event) }} fullWidth id="confirmPassword" label="confirm password" inputProps={{ type: 'password' }}>
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">REGISTER</Button>
                    </ListItem>
                    <ListItem>
                        Already have an account?<NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>-Sign in</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout >
    )
}

export default Register
