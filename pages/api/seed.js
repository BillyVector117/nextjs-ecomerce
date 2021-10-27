import nc from 'next-connect'
import dbConnect from '../../utils/database'
import Product from '../../models/Product'
import { data } from '../../utils/data'
import User from '../../models/User'
const handler = nc()

handler.get(async (req, res) => {
    await dbConnect()
/*     await User.deleteMany();
    await User.insertMany(data.users) */
    await Product.deleteMany();
    await Product.insertMany(data.products)
    res.send({ message: 'seeded successfully' })
})
export default handler;
