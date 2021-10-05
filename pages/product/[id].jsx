import { useRouter } from "next/router"
import Layout from "../../components/Layout";
// import { data } from "../../utils/data";
import NextLink from 'next/link'
import { useStyles } from "../../utils/styles";
import { Grid, List, ListItem, Typography, Card, Button } from "@material-ui/core";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Image from 'next/image'
import Product from "../../models/Product";
import dbConnect from "../../utils/database";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../context/Store";

function SingleProduct(props) {

    const { dispatch, state } = useContext(Store)
    const classes = useStyles()
    const { product } = props // This props refers to SSR function
    console.log('SSR response: ', product)

    // Get product ID through Utl-params (query)
    const router = useRouter()
    const { id } = router.query;
    // fetch for product in Database/json File
    // const product = data.products.find((item) => item.id == id)
    if (!product) {
        return (
            <div>
                This product no longer exists: {id}
            </div>)
    }
    const addToCartHandler = async () => {
        // console.log('Adding to cart')
        // Prevent add unavailable item
        // Verify if item already is at cart, if so, increase +1 else set to 1.
        const isItemAtCart = state.cart.cartItems.find((item) => { return item._id === product._id })
        const quantity = isItemAtCart ? isItemAtCart.quantity + 1 : 1
        const { data } = await axios.get(`/api/products/${product._id}`)
        // If user exceds limit quantity
        if (data.countInStock < quantity) {
            window.alert('Product out of stock')
            return;
        }
        // Here send to payload the product received in SSR props with an additional property (quantity)
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: quantity } })
        router.push('/cart')
    }
    return (
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}>
                <NextLink href={"/"} >
                    <a><Typography><strong>Go back</strong></Typography></a>
                </NextLink>
            </div>
            Product ID: {product._id}
            <Grid container spacing={1}>
                {/* 3 Grid sections (1. Image, 2. Product Info. 3. Cart Info.) */}
                <Grid item md={6} xs={12}>
                    <Card>
                        <Image src={product.image} alt={product.name} width={500} height={500} quality='100' layout="responsive">

                        </Image>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem><Typography component="h1" variant='h1' > <strong>{product.name}</strong></Typography> </ListItem>
                        <ListItem><Typography> <strong>Category:</strong>{product.category}</Typography> </ListItem>
                        <ListItem><Typography> <strong>Brand:</strong>{product.brand} </Typography> </ListItem>
                        <ListItem><Typography> <strong>Rating:</strong>{product.rating} start ({product.numReviews} reviews)</Typography> </ListItem>
                        <ListItem><Typography> <strong>Product description:</strong> {product.description}</Typography> </ListItem>
                        <ListItem><Typography> <strong>Category:</strong>{product.category}</Typography> </ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} > <Typography><strong>Price</strong></Typography></Grid>
                                    <Grid item xs={6}> <Typography>${product.price}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} > <Typography><strong>Status</strong></Typography></Grid>
                                    <Grid item xs={6}> <Typography>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Button onClick={addToCartHandler} fullWidth variant="contained" color="primary">Add to cart <AddShoppingCartIcon /></Button>
                                </Grid>
                            </ListItem>
                        </List>
                    </Card>

                </Grid>
            </Grid>
        </Layout>
    )
}

export default SingleProduct

// Get data from server side before rendering page
export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params
    try {
        await dbConnect();
        const product = await Product.findById(id).lean() // GET ALL product
        product._id = `${product._id}`
        product.createdAt = `${product.createdAt}`
        product.updatedAt = `${product.updatedAt}`
        // console.log(product)
        return {
            props: {
                product
            }
        }
    } catch (error) {
        console.log(error)
    }
}