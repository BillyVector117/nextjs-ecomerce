import nc from 'next-connect'
import User from '../../../../models/User'
import { isAuth } from '../../../../utils/auth'

import dbConnect from '../../../../utils/database'

const handler = nc()

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.put(async (req, res) => {
    await dbConnect()
    const user = await User.findById(req.query.id);
    user.isAdmin = true;
    user.save()
    res.send('Successfully updated!')
})
export default handler;