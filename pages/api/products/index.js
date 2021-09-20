import nc from 'next-connect'
import Product from '../../../models/Product'
import dbConnect from '../../../utils/database'
const handler = nc()


handler.get(async (req, res) => {
    await dbConnect()
    const products = await Product.find({});
    res.send(products)
})
export default handler;



