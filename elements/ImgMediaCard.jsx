import React from 'react';
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
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 6
  },
  mycard: {
    justifyContent: 'space-between'
  }
});

export default function ImgMediaCard({ product }) {
  const classes = useStyles();
  const { _id, name, category, image, price, brand, rating, numReviews, countInStock, description } = product;
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
        <Button size="" color="primary">
          $ {<strong> {price}</strong>}
        </Button>
        <FloatingCardActionButtons icon={'AddShoppingCartIcon'} />
      </CardActions>
    </Card>
  );
}
