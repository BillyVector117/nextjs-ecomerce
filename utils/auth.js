import jwt from 'jsonwebtoken'

// Basycally this function return a string (Token)
const signToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Like ExpressJS Middleware (Check if is the rela user)
const isAuth = async (req, res, next) => {
    // Authorization contains USER TOKEN which is sent in placeorder page by clicking the button
    // console.log('YOUR REQ.HEADERS: ', req.headers)
    const { authorization } = req.headers
    if (authorization) {
        // User sent Token like: Bearer xxx, so extract only the token part
        const token = authorization.slice(7, authorization.length);
        // verify with JWT the received token
        jwt.verify(token, process.env.JWT_SECRET, (err, validToken) => {
            if (err) {
                res.status(401).send({ message: 'INVALID TOKEN' })
            } else {
                // CREATE USER PROPERTY IN req (Object) and set the user properties (Model Object)
                // validToken contains all info of that User (When Created token)
                req.user = validToken
                next()
            }
        })
    } else {
        res.status(401).send({ message: 'TOKEN NOT SUPPLIED ' })
    }
}
export { signToken, isAuth }
