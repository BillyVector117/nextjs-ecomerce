import { Button, Card, Grid, Link, List, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useContext } from "react"
import Layout from "../components/Layout";
import { Store } from "../context/Store"
import NextLink from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import axios from "axios";
import { useRouter } from "next/router";
function CartPage() {
    const router = useRouter()
    const { state, dispatch } = useContext(Store)
    const { cart: { cartItems } } = state;
    console.log('Your items: ', cartItems)

    const updateCartQuantityHandler = async (item, quantitySelected) => {
        // Verify item stock, (Making an request to that specific item)
        const { data } = await axios.get(`/api/products/${item._id}`)
        // Prevent add unavailable item
        if (data.countInStock < quantitySelected) {
            window.alert('Product out of stock')
            return; 
        }
        // Here send to payload the product received in SSR props with an additional property (quantity)
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity: quantitySelected } })
    }
    const removeItemHandler = (receivedItem) => {
        dispatch({type: 'CART_REMOVE_ITEM', payload: receivedItem})
    }
    const HandlerCheckOut = () => {
        router.push('/shipping')
    }
    
    return (
        <Layout title="Shooping Cart">
            <Typography component="h1" variant="h1">Shopping cart</Typography>
            {
                cartItems.length === 0 ? (
                    <div>
                        Cart is empty. <NextLink href="/"><strong style={{ cursor: 'pointer' }}>Go shopping</strong></NextLink>
                    </div>
                ) : (
                    <Grid container style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Grid item md={8} xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Action</TableCell>
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
                                                    <Select value={item.quantity} onChange={(event) => updateCartQuantityHandler(item, event.target.value)}>
                                                        {[...Array(item.countInStock).keys()].map((index) => (
                                                            <MenuItem key={index + 1} value={index + 1}>{index + 1} </MenuItem>
                                                        ))}
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="right">
                                                  ${item.price}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button variant="contained" color="error" onClick={(() => removeItemHandler(item))}>x</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item md={3} xs={12} marginLeft={1}>
                            <Card>
                                <List>
                                    <ListItem>
                                        <Typography variant="h2">
                                            {/* Reduce the total products and the price */}
                                            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}items) : ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Button variant="contained" color="primary" onClick={HandlerCheckOut}>Check Out</Button>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>

                )
            }
        </Layout >
    )
}


export default dynamic(() => Promise.resolve(CartPage), { ssr: false })