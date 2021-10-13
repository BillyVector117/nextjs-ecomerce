import nc from 'next-connect'
import { isAuth } from '../../../utils/auth'
import User from '../../../models/User'
import dbConnect from '../../../utils/database'

const handler = nc()

// USE THIS MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)

handler.get(async (req, res) => {
    await dbConnect()
    // Return Total Users per Month
    // Response Ex: [{"id": 5, "total": 3}]
    const data = await User.aggregate([
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);


    res.send(data)
})
export default handler;
