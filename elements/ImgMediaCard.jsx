import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatingCardActionButtons from './FloatingActionButtons'
import NextLink from 'next/link'
import { Store } from '../context/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import dynamic from 'next/dynamic';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    /* maxHeight: 400, */
    margin: 6
  },
  mycard: {
    justifyContent: 'space-between'
  }
});

 function ImgMediaCard({ product }) {
  const { dispatch, state } = useContext(Store)
  const router = useRouter()
  const classes = useStyles();
  const { _id, name, image, price, description } = product;
  // Next update: const { _id, name, category, image, price, brand, rating, numReviews, countInStock, description } = product;
  const addToCartHandler = async (item) => {
    // console.log('Adding to cart')
    // Prevent add unavailable item
    // Verify if item already is at cart, if so, increase +1 else set to 1.
    const isItemAtCart = state.cart.cartItems.find((product) => { return product._id === item._id })
    const quantity = isItemAtCart ? isItemAtCart.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${item._id}`)
    // If user exceds limit quantity
    if (data.countInStock < quantity) {
      window.alert('Product out of stock')
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } }) // quantity: quantity
    router.push('/cart')
  }

  return (
    <Card className={classes.root}>
      <NextLink href={"/product/" + _id} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={image}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description.slice(0, 60) + '...'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions className={classes.mycard}>
        <Button size="small" color="primary">
          Share
        </Button>
        <FloatingCardActionButtons product={product} addToCartHandler={addToCartHandler} icon={'AddShoppingCartIcon'} />
        <Button color="primary">
          $ {<strong> {price}</strong>}
        </Button>
      </CardActions>
    </Card>
  );
}

export default dynamic(() => Promise.resolve(ImgMediaCard), { ssr: false })

