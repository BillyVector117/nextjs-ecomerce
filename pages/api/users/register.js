import nc from 'next-connect'
import User from '../../../models/User'
import dbConnect from '../../../utils/database'
import bcrypt from 'bcrypt'
import { signToken } from '../../../utils/auth'
const handler = nc()

// Generatin a new user (Register)
handler.post(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10)
    await dbConnect()
    const newUser = await new User({ name, email, password, isAdmin: false })
    const user = await newUser.save()
    const token = signToken(user) // Return the token
    console.log('User created: ', user, token)
    res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
})
export default handler;
