const jwt = require("jsonwebtoken")
require('dotenv').config()
const { JWT_SECRET } = process.env

function createJWT(payload) {
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: "1h"}
    )
    
    return token
}

function verifyJWT(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    createJWT,
    verifyJWT
}