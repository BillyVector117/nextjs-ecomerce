import nc from 'next-connect'
import Order from '../../../../models/Order'
import { isAuth } from '../../../../utils/auth'
import dbConnect from '../../../../utils/database'

const handler = nc()

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.get(async (req, res) => {
    await dbConnect()
    const order = await Order.findById(req.query.id);
    res.send(order)
})
export default handler;
