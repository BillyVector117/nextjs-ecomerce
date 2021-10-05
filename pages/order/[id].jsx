import { Card, CircularProgress, Grid, Link, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useContext, useEffect, useReducer } from "react"
import NextLink from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import axios from "axios";
import Layout from "../../components/Layout";
import { Store } from "../../context/Store";
import { useStyles } from "../../utils/styles";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        // Cases when pay is success
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true, error: '' };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false, errorPay: '' };
        default:
            state;
    }
}

// Component function (Params comes from getServerSideProps() which reads Url-Params [id] for this filename)
function Order({ params }) {
    const orderId = params.id // 'id' because is inside [] in this filename
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    const classes = useStyles()
    const router = useRouter()
    const { state } = useContext(Store)
    const { userInfo } = state;
    const { enqueueSnackbar } = useSnackbar()

    // This useReducer will fill after Fetch request action
    const [{ loading, error, order, successPay }, dispatch] = useReducer(reducer, { loading: true, order: {}, error: '' })
    // 'order' will fill after data-API request
    const { shippingAddress, paymentMethod, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice, isDelivered, isPaid, paidAt, deliveredAt } = order

    // FETCH REQUEST TO single order to fill data in useReducer Hook and use in JSX Section (orderId is the :_id from Url-Params, captured for getServerSideProps())
    useEffect(() => {
        if (!userInfo) {
            // push to /login because is not Authenticated User
            router.push('/login')
        }
        const fetchOrder = async () => {
            try {
                // orderId comes from Url-Params
                dispatch({ type: 'FETCH_REQUEST' }); // Loader: true, error: ''
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                // Send received response as payload
                dispatch({ type: 'FETCH_SUCCESS', payload: data }) // Loader: false, error: '', order: {...}
            } catch (error) {

                dispatch({ type: 'FETCH_FAIL', payload: error })
            }
        }
        console.log('Order received: ', order)
        if (!order._id || successPay || (order._id && order._id !== orderId)) {
            // order._id and orderId should be the same because we send the Url-params ID to the request-API 
            // So, the request search and returns the document with that ID
            fetchOrder()
            if (successPay) {
                dispatch({ type: 'PAY_RESET', payload: error })
            }
        } else {
            // At this point order Object is available with all its properties
            // PAYPAL INIT
            const loadPayPalScript = async () => {
                // GET PAYPAL_CLIENT_ID through Request for protect data  (env.local) then rename 'data' AS 'clientId'
                const { data: clientId } = await axios.get('/api/keys/paypal', {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                // SET CLIENT ID & CURRENCY FOR PAYPAL
                paypalDispatch({
                    type: 'resetOptions', value: {
                        'client-id': clientId,
                        currency: 'USD',
                    }
                })
                // LOAD PAYPAL SCRIPT FROM PAYPAL WEBSITE
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            loadPayPalScript()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, successPay])

    // CALL ACTIONS FROM PAYPAL TO CREATE THE ORDER (Only set the totalPrice to pay)
    function createOrder(data, actions) {
        // create() return a Promise
        return actions.order.create({ purchase_units: [{ amount: { value: totalPrice } }] })
            // This orderID is the order generated by PayPal
            .then((orderID) => { return orderID })
    }
    // APROVE FUNCTION (PAYPAL) AT THIS POINT 'ispaid' property for 'order' Object needs to change to true, so make an put request to modify it.
    function onApprove(data, actions) {
        // Need to update status pay in database ('ispaid')
        return actions.order.capture().then(async function (details) {
            try {
                // At this point pay request is waiting to UPDATE the database to 'ispaid' to TRUE
                dispatch({ type: 'PAY_REQUEST' })
                const { data } = await axios.put(`/api/orders/${order._id}/pay`,
                    details,
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` }
                    })
                // Get back the same Object Order but updated with 'ispaid' to TRUE
                dispatch({ type: 'PAY_SUCCESS', payload: data })
                enqueueSnackbar('Paid successfully!', { variant: 'success' })
            } catch (error) {
                dispatch({ type: 'PAY_FAIL', payload: error })
                enqueueSnackbar('Paid not complete!', { variant: 'error' })
            }
        })
    }
    // THIS FUNCTION APPENDS AN ERROR WHEN OCURRS IN PAYPAL PAYMENT
    function onError(err) {
        enqueueSnackbar('Paid not completed!', { variant: 'error' })
    }
    return (
        <Layout title={`Order ${orderId}`} >
            <br />
            <Typography component="h1" variant="h1">Order {orderId}</Typography>
            {loading ? <CircularProgress />
                : error ? <Typography className={classes.error}>{error}</Typography>
                    : <Grid container style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                                <ListItem>
                                    Status: {isDelivered ? `delivered at ${deliveredAt}` : 'Not delivered'}
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
                                <ListItem>
                                    Status: {isPaid ? `paid at ${paidAt}` : 'Not paid'}
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
                                                    {orderItems.map((item) => (
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
                                    {!isPaid && (
                                        <ListItem>
                                            {isPending ? (
                                                <CircularProgress />
                                            ) :
                                                (
                                                    <div className={classes.fullWidth}>
                                                        <PayPalButtons
                                                            createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError}>
                                                        </PayPalButtons>
                                                    </div>
                                                )
                                            }
                                        </ListItem>
                                    )}
                                </List>
                            </Card>
                        </Grid>
                    </Grid>}
        </Layout >
    )
}
// READ URL-PARAMS TO GET :id and send it to fronted side
// THIS FUNCTION RUNS ON SERVER SIDE, Params refers to Url-params (In this case :id fileName)
export async function getServerSideProps({ params }) {
    return { props: { params } }
}
export default dynamic(() => Promise.resolve(Order), { ssr: false })