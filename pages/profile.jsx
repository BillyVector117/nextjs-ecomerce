import { Button, Card, Grid, List, ListItem, ListItemText, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Layout from "../components/Layout";
import { Store } from "../context/Store"
import { useStyles } from "../utils/styles";
import NextLink from 'next/link'
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

function Profile() {
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state;
    const router = useRouter()
    const classes = useStyles()
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [errors, setErrors] = useState({ name: false, email: false, password: false, confirmPassword: false })
    const messageName = 'Name field only accepts letters and blank spaces'
    const messageEmail = 'Incorrect E-mail, try again'
    const messagePassword = 'Password must have at least 8 characters'
    const messageConfirmPassword = 'Passwords must match'
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // Only authenticated user can access this page
        if (!userInfo) {
            return router.push('/login')
        }
        setFormData({ ...formData, ['name']: userInfo.name, ['email']: userInfo.email })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitHandler = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('password does not match')
            return
        }
        try {
            // Return an Updated User object with a valid token
            const { data } = await axios.put('/api/users/profile', formData, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })
            // SAVING THE RETURNED DATA (OBJECT) INTO GLOBAL STATE (CONTEXT)
            dispatch({ type: 'USER_LOGIN', payload: data })
            Cookies.set('userInfo', JSON.stringify(data))
            enqueueSnackbar('Successfully updated!', { variant: 'success' })
            console.log('ALL OK', data)
        } catch (error) {
            console.log('ERROR', error)
            enqueueSnackbar(error, { variant: 'error' })
            alert(error.response.data ? error.response.data.message : error.message)
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
        else if (formData.password.length > 0) {
            if (formData.password.length < 8) {
                setErrors({ ...errors, password: true })
                countErrors += 1
            }
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
        <Layout title="Profile" >
            <br />
            <Grid container style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* SIDE BAR */}
                <Grid item md={3} xs={12}>
                    <Card>
                        <NextLink href="/profile" passHref>
                            <ListItem selected button component="a">
                                <ListItemText primary="User profile"></ListItemText>
                            </ListItem>
                        </NextLink>
                        <NextLink href="/order-history" passHref>
                            <ListItem button component="a">
                                <ListItemText primary="Profile"></ListItemText>
                            </ListItem>
                        </NextLink>
                    </Card>
                </Grid >
                {/* CONTENT SIDE */}
                <Grid item md={9} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">Profile</Typography>
                            </ListItem>
                            <ListItem>
                                <form onSubmit={submitHandler} className={classes.form}>
                                    <List>
                                        <ListItem>
                                            <TextField error={errors.name} helperText={errors.name && messageName} variant="outlined" name="name" autoComplete="on" onChange={(event) => { return handleChange(event) }} onBlur={(event) => { onBlurHandler(event) }} style={{ width: '100%' }} id="name" inputProps={{ type: 'name' }} value={formData.name} >
                                            </TextField>
                                        </ListItem>
                                        <ListItem>
                                            <TextField error={errors.email} helperText={errors.email && messageEmail} variant="outlined" name="email" autoComplete="on" onChange={(event) => { return handleChange(event) }} onBlur={(event) => { onBlurHandler(event) }} style={{ width: '100%' }} id="email" inputProps={{ type: 'email' }} value={formData.email} >
                                            </TextField>
                                        </ListItem>
                                        {
                                            !userInfo?.createdByGoogle &&
                                            (
                                                <>
                                                    <ListItem>
                                                        <TextField error={errors.password} helperText={errors.password && messagePassword} variant="outlined" name="password" autoComplete="on" onChange={(event) => { return handleChange(event) }} onBlur={(event) => { onBlurHandler(event) }} fullWidth id="password" label="password" inputProps={{ type: 'password' }}>
                                                        </TextField>
                                                    </ListItem>
                                                    <ListItem>
                                                        <TextField error={errors.confirmPassword} helperText={errors.confirmPassword && messageConfirmPassword} variant="outlined" name="confirmPassword" autoComplete="on" onChange={(event) => { return handleChange(event) }} onBlur={(event) => { onBlurHandler(event) }} fullWidth id="confirmPassword" label="confirm password" inputProps={{ type: 'confirmPassword' }}>
                                                        </TextField>
                                                    </ListItem>
                                                </>
                                            )
                                        }
                                        <ListItem>
                                            <Button variant="contained" type="submit" fullWidth color="primary">UPDATE</Button>
                                        </ListItem>
                                    </List>
                                </form>
                            </ListItem>
                        </List>
                    </Card>
                </ Grid >
            </Grid >
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false })
