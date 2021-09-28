import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from "@material-ui/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router"
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react"
import CheckOutWizard from "../components/CheckOutWizard";
import Layout from "../components/Layout";
import { Store } from "../context/Store";
import { useStyles } from "../utils/styles";

function Payment() {
    const classes = useStyles()
    const router = useRouter()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    // Change for each Radio-Button select
    const [paymentMethod, setPaymentMethod] = useState('')
    // Context-API Access
    const { state, dispatch } = useContext(Store)
    const { cart: { shippingAddress } } = state; // Get 'shippingAddress' from cart property

    // Check if User completed the previous form in "/shipping"
    useEffect(() => {
        if (!shippingAddress.address) {
            router.push('/shipping')
        } else {
            // Use Cookies in case is the n time user returns to this page
            setPaymentMethod(Cookies.get('paymentMethod') || '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const submitHandler = async (event) => {
        event.preventDefault()
        closeSnackbar()
        if (!paymentMethod) {
            enqueueSnackbar('Payment method required!', { variant: 'error' })
        } else {
            // Save method at Context-API (Will save: 'PayPal', 'Stripe' or 'Cash')
            dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod })
            Cookies.set('paymentMethod', paymentMethod);
            router.push('/placeorder')
        }
    }

    return (
        <Layout title="Payment method">
            <br />
            <CheckOutWizard activeStep={2} />
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component="h1" variant="h1">Payment Method</Typography>
                {/* List = ul, ListItem = li */}
                <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="Payment Method"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(event) => { return setPaymentMethod(event.target.value) }}
                            >
                                <FormControlLabel
                                    label="PayPal"
                                    value="PayPal"
                                    control={<Radio />}>
                                </FormControlLabel>
                                <FormControlLabel
                                    label="Stripe"
                                    value="Stripe"
                                    control={<Radio />}>
                                </FormControlLabel>
                                <FormControlLabel
                                    label="Cash"
                                    value="Cash"
                                    control={<Radio />}>
                                </FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="submit" variant="contained" color="primary">CONTINUE</Button>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="button" variant="contained" onClick={() => { return router.push('/shipping') }}>BACK</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Payment
