import nc from 'next-connect'
import Order from '../../../../models/Order'
import Product from '../../../../models/Product'

import { isAuth } from '../../../../utils/auth'
import dbConnect from '../../../../utils/database'
import { onError } from '../../../../utils/error'
const handler = nc({ onError })

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.put(async (req, res) => {
    await dbConnect()
    const order = await Order.findById(req.query.id);
    // console.log('my order: ', order.orderItems)
    const orderItems = order.orderItems;

    // GET AN OBJECTS-ARRAY WHICH CONTAINS EVERY PRODUCT (._id) WITH ITS QUANTITY WITH (._id, and quantity)
    const orderReducer = orderItems.reduce((acc, curr) => {
        return [...acc, { [curr._id]: curr.quantity, id: curr._id, quantity: curr.quantity }]
    }, [])
    // console.log('ORDER REDUCER:', orderReducer)

    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                email_address: req.body.email_address
            }
        const paidOrder = await order.save()
        // DECREMENT STOCK QUANTITY FOR EACH PRODUCT SOLD (IN DB)
        orderReducer.forEach(async (item) => {
            // console.log('Iterations', item)
            const found = await Product.findById(`${item.id}`)
            // console.log('we found this: ', found, `${item.id}`)
            found.countInStock -= item.quantity
            await found.save()
            // Product.findByIdAndUpdate(item._id, {countInStock: this.countInStock -  item._id})
        })
        res.send({ message: 'Order paid', order: paidOrder })
    } else {
        res.status(404).send({ message: 'Order not found' })
    }
})
export default handler;