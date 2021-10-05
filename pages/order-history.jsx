import { Button, Card, CircularProgress, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import axios from "axios";
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useContext, useEffect, useReducer } from "react"
import Layout from "../components/Layout";
import { Store } from "../context/Store"
import { useStyles } from "../utils/styles";
import NextLink from 'next/link'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

function OrdersHistory() {
    const { state } = useContext(Store)
    const { userInfo } = state;
    const router = useRouter()
    const classes = useStyles()
    // This useReducer will fill after Fetch request action
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, { loading: true, orders: [], error: '' })

    useEffect(() => {
        // Only authenticated user can access this page
        if (!userInfo) {
            router.push('/login')
        }
        const fetchOrder = async () => {
            try {
                // orderId comes from Url-Params
                dispatch({ type: 'FETCH_REQUEST' }); // Loading: true, error: ''
                const { data } = await axios.get(`/api/orders/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                // Send received response as payload
                dispatch({ type: 'FETCH_SUCCESS', payload: data }) // Loading: false, error: '', orders: [{...}, {...}]
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error })
            }
        }
        fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Layout title="Order History" >
            <br />
            <Grid container style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* SIDE BAR */}
                <Grid item md={3} xs={12}>
                    <Card>
                        <NextLink href="/profile" passHref>
                            <ListItem button component="a">
                                <ListItemText primary="User profile"></ListItemText>
                            </ListItem>
                        </NextLink>
                        <NextLink href="/order-history" passHref>
                            <ListItem selected button component="a">
                                <ListItemText primary="Order History"></ListItemText>
                            </ListItem>
                        </NextLink>
                    </Card>
                </Grid >
                {/* CONTENT SIDE */}
                <Grid item md={9} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h1" variant="h1">Order History</Typography>
                            </ListItem>
                            <ListItem>
                                {loading ? <CircularProgress />
                                    : error ? (<Typography className={classes.error}>{error}</Typography>)
                                        : (
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>ID</TableCell>
                                                            <TableCell>DATE</TableCell>
                                                            <TableCell>TOTAL</TableCell>
                                                            <TableCell>PAID</TableCell>
                                                            <TableCell>DELIVERED</TableCell>
                                                            <TableCell>ACTION</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            orders.map((order) => (
                                                                <TableRow key={order._id}>
                                                                    <TableCell>{order._id.substring(20, 24)} </TableCell>
                                                                    <TableCell>{order.createdAt} </TableCell>
                                                                    <TableCell>${order.totalPrice} </TableCell>
                                                                    <TableCell>{order.isPaid ? `Paid at ${order.paidAt}` : 'Not paid'} </TableCell>
                                                                    <TableCell>{order.isDelivered ? `Delivered at ${order.deliveredAt}` : 'Not delivered'} </TableCell>
                                                                    <TableCell>
                                                                        <NextLink href={`/order/${order._id}`} passHref>
                                                                            <Button variant="contained">Details</Button>
                                                                        </NextLink>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
                            </ListItem>
                        </List>
                    </Card>
                </ Grid >
            </Grid >
        </Layout >
    )
}

export default dynamic(() => Promise.resolve(OrdersHistory), { ssr: false })
