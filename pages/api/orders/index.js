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
    // console.log('Creating order to: ', req.user)
    await dbConnect()
    // req.user is a object created in isAuth() middleware which set in req a new prop (user)
    const newOrder = new Order({
        ...req.body, user: req.user._id
    });
    const order = await newOrder.save();
    res.status(201).send(order)
})
export default handler;
