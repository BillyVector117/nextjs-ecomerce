import nc from 'next-connect'
import User from '../../../models/User'
import dbConnect from '../../../utils/database'
import bcrypt from 'bcrypt'
import { signToken } from '../../../utils/auth'
const handler = nc()

// Generating a new user (Register)
handler.post(async (req, res) => {
    // console.log('RECEIVED DATA: ', req.body)
    const name = req.body.displayName;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.stsTokenManager.accessToken, 10)
    await dbConnect()
    const alreadyExist = await User.findOne({ email: req.body.email })

    if (alreadyExist) {
        const token = signToken(alreadyExist) // Return the token
        // console.log('User is signin with Google ACC: ', alreadyExist, token)

        return res.send({
            token,
            _id: alreadyExist._id,
            name: alreadyExist.name,
            email: alreadyExist.email,
            isAdmin: alreadyExist.isAdmin,
            createdByGoogle: alreadyExist.createdByGoogle
        })
    } else {
        const newUser = await new User({ name, email, password, createdByGoogle: true, isAdmin: false })
        const user = await newUser.save()
        const token = signToken(user) // Return the token
        // console.log('User created with Google ACC: ', user, token)

        res.send({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdByGoogle: user.createdByGoogle
        })
    }
})
export default handler;
