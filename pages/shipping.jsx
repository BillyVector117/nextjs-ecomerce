import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Store } from "../context/Store";
import { Button, List, ListItem, TextField, Typography } from "@material-ui/core"
import Layout from "../components/Layout"
import Cookies from "js-cookie"
import { Controller, useForm } from "react-hook-form"
import { useStyles } from "../utils/styles";
import CheckOutWizard from "../components/CheckOutWizard";

function Shipping() {
    const router = useRouter()
    const classes = useStyles()
    const { handleSubmit, control, formState: { errors }, setValue } = useForm();
    const { state, dispatch } = useContext(Store)
    const { userInfo, cart: { shippingAddress } } = state;

    useEffect(() => {
        if (!userInfo) {
            // push to /login but set a query at Url. 'redirect' refers to router.query 
            router.push('/login?redirect=/shipping')
        }
        // Load and set placeholder values from Cookies
        setValue('fullName', shippingAddress.fullName)
        setValue('address', shippingAddress.address)
        setValue('city', shippingAddress.city)
        setValue('country', shippingAddress.country)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitHandler = ({ fullName, address, city, postalCode, country }) => {
        // SAVING THE RETURNED DATA (OBJECT) INTO GLOBAL STATE (CONTEXT)
        dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: { fullName, address, city, postalCode, country } })
        // Save address to Cookies to set placeholder next time
        Cookies.set('shippingAddress', JSON.stringify({ fullName, address, city, postalCode, country }))
        router.push('/payment')
    }

    return (
        <Layout title="Shipping Address">
            <br />
            <CheckOutWizard activeStep={1} />
            <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                <Typography component="h1" variant="h1">
                    Shipping Address
                </Typography>
                <List>
                    {/* Controller provided by react-hook-form */}
                    <ListItem>
                        <Controller
                            control={control}
                            name="fullName"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 5
                            }}
                            render={({ field }) => (
                                <TextField variant="outlined"
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="fullName"
                                    label="Full Name"
                                    error={Boolean(errors.fullName)}
                                    helperText={errors.fullName ? errors.fullName.type === 'minLength' ? 'Full Name not valid' : 'Full Name is required' : ''}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            control={control}
                            name="address"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 5
                            }}
                            render={({ field }) => (
                                <TextField variant="outlined"
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="address"
                                    label="Address"
                                    error={Boolean(errors.address)}
                                    helperText={errors.address ? errors.address.type === 'minLength' ? 'Address not valid' : 'Address is required' : ''}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            control={control}
                            name="city"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 5
                            }}
                            render={({ field }) => (
                                <TextField variant="outlined"
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="city"
                                    label="City"
                                    error={Boolean(errors.city)}
                                    helperText={errors.city ? errors.city.type === 'minLength' ? 'City not valid' : 'City is required' : ''}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            control={control}
                            name="postalCode"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 5
                            }}
                            render={({ field }) => (
                                <TextField variant="outlined"
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="postalCode"
                                    label="Postal Code"
                                    error={Boolean(errors.postalCode)}
                                    helperText={errors.postalCode ? errors.postalCode.type === 'minLength' ? 'Postal Code not valid' : 'Postal Code is required' : ''}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            control={control}
                            name="country"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 5
                            }}
                            render={({ field }) => (
                                <TextField variant="outlined"
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="country"
                                    label="Country"
                                    error={Boolean(errors.country)}
                                    helperText={errors.country ? errors.country.type === 'minLength' ? 'Country not valid' : 'Country is required' : ''}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">CONTINUE</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Shipping
