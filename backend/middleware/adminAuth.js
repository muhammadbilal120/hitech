import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    // console.log(req.headers, "header")
    const token = req.headers.authorization
    try {
        // console.log(token, "highlight")
        if (!token) {
            return res.json({ success: false, message: 'No token provided' })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
            return res.json({ success: false, message: 'Token is not valid' })
    }
}

export default adminAuth;