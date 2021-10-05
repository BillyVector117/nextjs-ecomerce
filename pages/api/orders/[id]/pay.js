import nc from 'next-connect'
import Order from '../../../../models/Order'
import { isAuth } from '../../../../utils/auth'
import dbConnect from '../../../../utils/database'
import { onError } from '../../../../utils/error'
const handler = nc({ onError })

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.put(async (req, res) => {
    await dbConnect()
    const order = await Order.findById(req.query.id);
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                email_address: req.body.email_address
            }
        const paidOrder = await order.save()
        res.send({ message: 'Order paid', order: paidOrder })

    } else {
        res.status(404).send({ message: 'Order not found' })
    }
    res.send(order)
})
export default handler;