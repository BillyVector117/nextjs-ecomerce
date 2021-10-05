import nc from 'next-connect'
import Order from '../../../models/Order'
import { isAuth } from '../../../utils/auth'
import dbConnect from '../../../utils/database'

const handler = nc()

// USE A MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.get(async (req, res) => {
    await dbConnect()
    // 'req.user' is available because in JWT middleware (isAuth()) set that property for req.
    const orders = await Order.find({ user: req.user._id });
    res.send(orders)
})
export default handler;