import { Grid } from '@material-ui/core'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import ImgMediaCard from '../elements/ImgMediaCard'
import Product from '../models/Product'
import styles from '../styles/Home.module.css'
import { data } from '../utils/data'
import dbConnect from '../utils/database'
import { useStyles } from '../utils/styles'
export default function Home(props) {
  console.log(data)
  const { products, cartItems } = props
  console.log('SSR props: ', products)
  console.log('SSR for cookies: ',cartItems )
  const classes = useStyles()
  return (
    <Layout >
      <div className={styles.container}>
        <main style={{ overflow: 'hidden' }} >
          {/*  <h1 className={styles.title}>
            PRODUCTS
          </h1> */}
          <Grid container item xs={12} spacing={3}>
            {products.map((product, index) => (
              <Grid key={index} item xs={6} md={4}>
                <ImgMediaCard product={product} />

              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </Layout>
  )
}


// Get data from server side before rendering page
export async function getServerSideProps() {
  try {
    await dbConnect();
    const response = await Product.find({}) // GET ALL product
    const products = response.map((doc) => {
      const product = doc.toObject()
      product._id = `${product._id}`
      product.createdAt = `${product.createdAt}`
      product.updatedAt = `${product.updatedAt}`
      return product
    })
    return {
      props: {
        products,
        
      }
    }
  } catch (error) {
    console.log(error)
  }
}
