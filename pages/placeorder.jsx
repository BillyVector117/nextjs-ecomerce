import { Button, Card, CircularProgress, Grid, Link, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react"
import Layout from "../components/Layout";
import { Store } from "../context/Store"
import NextLink from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import { useStyles } from "../utils/styles";
import CheckOutWizard from "../components/CheckOutWizard";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";

function PlaceOder() {
    const classes = useStyles()
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { userInfo, cart: { cartItems, shippingAddress, paymentMethod } } = state;

    // Function to round a number
    const round2 = (number) => {
        return Math.round(number * 100 + Number.EPSILON) / 100; // 123.466 = 123.47
    }
    // GET TOTAL ITEMS PRICE. Sum price of each item in cartItems, then rund it with 'round2' function
    const itemsPrice = round2(cartItems.reduce((accum, currentValue) => { return accum + (currentValue.price * currentValue.quantity) }, 0))
    // console.log(itemsPrice)

    // GET SHIPPING PRICE.
    const shippingPrice = itemsPrice > 200 ? 0 : 15;

    // GET TAX PRICE.
    const taxPrice = round2(itemsPrice * 0.15) // IVA

    // GET TOTAL PRICE.
    const totalPrice = round2(itemsPrice + taxPrice + shippingPrice)

    useEffect(() => {
        if (!paymentMethod) {
            // push to /payment because is not any payment method selected
            router.push('/payment')
        }
        // Check if cartItems is empty
        if (cartItems.length === 0) {
            router.push('/cart')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // CLICK BUTTON
    const { closeSnackbar, enqueueSnackbar } = useSnackbar()
    // State for showing loading message
    const [loading, setLoading] = useState(false);
    
    const placeOrderHandler = async () => {
        closeSnackbar()
        try {
            setLoading(true)
            // Send USER TOKEN and orderData (object, Info created in this module) to /orders endpoint
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                paymentMethod,
                shippingAddress,
                shippingPrice,
                taxPrice,
                totalPrice,
                itemsPrice,
            }, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            })
            // Clear All cartItems state and Cookies
            dispatch({ type: 'CART_CLEAR' })
            Cookies.remove('cartItems')
            setLoading(false)
            // console.log(data)
            // Push user to Single order details page (REQUIRES DATA._ID RESPONSE)
            router.push(`/order/${data._id}`)
        } catch (error) {
            setLoading(false)
            // Use 'getError' helper to catch easier the error
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }
    return (
        <Layout title="Place Order">
            <br />
            <CheckOutWizard activeStep={3}>
            </CheckOutWizard>
            <Typography component="h1" variant="h1">Place Order</Typography>
            <Grid container style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid item md={8} xs={12}>
                    <Card>
                        <ListItem>
                            <Typography component="h2" variant="h2">
                                Shipping Address
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {shippingAddress.fullName}, {shippingAddress.address}, {' '}
                            {shippingAddress.city}, {shippingAddress.postalCode}, {' '}
                            {shippingAddress.country},
                        </ListItem>
                    </Card>
                    <Card>
                        <ListItem>
                            <Typography component="h2" variant="h2">
                                Payment Method
                            </Typography>
                        </ListItem>
                        <ListItem>
                            {paymentMethod}
                        </ListItem>
                    </Card>
                    <Card >
                        <List>
                            <ListItem>
                                <Typography component="h2" variant="h2">
                                    Order Items
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Image</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartItems.map((item) => (
                                                <TableRow key={item._id} >
                                                    <TableCell>
                                                        <NextLink href={`/product/${item._id}`} passHref>
                                                            <Link>
                                                                <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                            </Link>
                                                        </NextLink>
                                                    </TableCell>
                                                    <TableCell>
                                                        <NextLink href={`/product/${item._id}`} passHref>
                                                            <Link>
                                                                <Typography>{item.name} </Typography>
                                                            </Link>
                                                        </NextLink>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography>{item.quantity}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography>${item.price}</Typography>

                                                    </TableCell>
                                                    <TableCell align="right">
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12} marginLeft={1}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography variant="h2">
                                    Order Summary
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Items:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">${itemsPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Tax:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">${taxPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Shipping:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">${shippingPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography ><strong>Total:</strong></Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right"><strong>${totalPrice}</strong></Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button
                                    onClick={placeOrderHandler}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >PLACE MY ORDER
                                </Button>
                            </ListItem>
                            {loading && <CircularProgress />}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(PlaceOder), { ssr: false })
