import nc from 'next-connect'
import Order from '../../../models/Order'
import { isAuth } from '../../../utils/auth'
import dbConnect from '../../../utils/database'
import { onError } from '../../../utils/error';
const handler = nc({ onError })

// USE A MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)
// CREATE AN ORDER IN BACKEND
handler.post(async (req, res) => {

    await dbConnect()
    // req.user._id is a object created in isAuth() middleware which set in req a new prop (user)
    const newOrder = new Order({
        ...req.body, user: req.user._id
    });
    const order = await newOrder.save();
    res.status(201).send(order)


})
export default handler;