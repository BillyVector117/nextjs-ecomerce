import nc from 'next-connect'
import { isAuth } from '../../../utils/auth'
const handler = nc()

// GET PAYMENT_CLIENT_ID Requires USER TOKEN
handler.use(isAuth)
handler.get(async (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
export default handler;
