import nc from 'next-connect'
import Product from '../../../models/Product';
import { isAuth } from '../../../utils/auth'
import dbConnect from '../../../utils/database'
import { onError } from '../../../utils/error';
const handler = nc({ onError })

// USE A MIDDLEWARE TO CHECK ACTIVE USER (BEFORE CONTINUE WITH REQUEST)
handler.use(isAuth)
// CREATE AN PRODUCT IN BACKEND
handler.post(async (req, res) => {
    // console.log('Creating new product from: ', req.user)
    // console.log('New product body: ', req.body)
    await dbConnect()
    // req.user is a object created in isAuth() middleware which set in req a new prop (user)
    const newProduct = new Product({
        ...req.body, rating: 0, image: 'https://static.wikia.nocookie.net/residentevil/images/0/08/Tricell.jpg/revision/latest/top-crop/width/360/height/450?cb=20110304143336&path-prefix=es'
    });
    const product = await newProduct.save();
    // console.log(product)
    res.status(201).send(product)
})
export default handler;