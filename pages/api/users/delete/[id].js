import nc from 'next-connect'
import User from '../../../../models/User'
import { isAuth } from '../../../../utils/auth'
import dbConnect from '../../../../utils/database'

const handler = nc()

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.delete(async (req, res) => {
    await dbConnect()
    await User.findByIdAndDelete(req.query.id);
    res.send('Successfully deleted!')
})
export default handler;