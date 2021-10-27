import { Grid } from '@material-ui/core'
import Layout from '../components/Layout'
import ImgMediaCard from '../elements/ImgMediaCard'
import Product from '../models/Product'
import styles from '../styles/Home.module.css'
// import { data } from '../utils/data'
import dbConnect from '../utils/database'

export default function Home(props) {
  // console.log(data)
  const { products } = props
  // console.log('SSR response: ', products)
   
  return (
    <Layout >
      <br />
          <Grid container item xs={12} spacing={3}>
            {products.map((product, index) => (
              <Grid key={index} item xs={6} md={4}>
                <ImgMediaCard product={product} />
              </Grid>
            ))}
          </Grid>
     <br />
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
    // console.log(error)
  }
}
