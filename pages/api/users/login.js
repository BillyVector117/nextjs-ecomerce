import nc from 'next-connect'
import User from '../../../models/User'
import dbConnect from '../../../utils/database'
import bcrypt from 'bcrypt'
import { signToken } from '../../../utils/auth'
const handler = nc()

// Authenticate user (Login)
handler.post(async (req, res) => {
    await dbConnect()
    const user = await User.findOne({ email: req.body.email }); // Return one Object
    // Check is user exists and check for correct password
    console.log('User found: ', user)
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = signToken(user) // Return the token
            // Excluding password before sending a response
            // eslint-disable-next-line no-unused-vars
            const { password, ...userProperties } = user._doc;
            console.log('token', token)
            res.send({ token, ...userProperties })
        } else {
            res.status(401).send({ message: 'Invalid Credentials' })
        }
    } else {
        res.status(401).send({ message: 'Unregistered Email' })
    }
}
)
export default handler;
