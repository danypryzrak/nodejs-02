const { createHttpException, verifyJWT } = require("../services")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../database/models/user.models")

const userAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            throw createHttpException("Not authorized", 401)
        }

        const [bearer, token] = authHeader.split(' ')
        if (bearer !== 'Bearer' || !token) {
            throw createHttpException("UNot authorized", 401)
        }

        try {
            const tokenPayload = verifyJWT(token)
        
            if (!tokenPayload.userId || !tokenPayload.sessionKey) {
            throw createHttpException("Not authorized", 401)
            }

            const user = await UserModel.findById(tokenPayload.userId)
            
            if (!user) {
            throw createHttpException("Not authorized", 401)
            }

            req.user = user
        } catch (error) {
            throw createHttpException("Not authorized", 401, error)
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userAuthMiddleware
}