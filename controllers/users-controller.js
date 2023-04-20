const crypto = require('crypto')
const { UserModel } = require("../database/models/user.models")
const { createHash, checkHash, createJWT } = require("../services")
const { registrationSchema, loginSchema } = require('../shemas')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {JWT_SECRET} = process.env

const userRegister = async (req, res, next) => {
    const { email, password } = req.body
    try {

        const valid = registrationSchema.validate({ email, password })
        
        if (valid.error) {
            res.status(400).json(valid.error)
        } else {
            const existingUser = await UserModel.findOne({ email })
            
            if (existingUser) {
                res.status(409).json({ message: "Email in use" })
            } else {
                const passwordHash = await createHash(password)
                const newUser = await UserModel.create({ password: passwordHash, email })
                res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } })
            }
        }
    } catch (err) {
        next(err)
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const valid = loginSchema.validate({ email, password })
        if (valid.error) {
            res.status(400).json(valid.error)
        } else {
            const user = await UserModel.findOne({ email })
            if (!user) {
                throw createHttpException('User is not found', 404)
            }

            const match = await checkHash(password, user.password)
            if (!match) {
                res.status(401).json({ message: 'Email or password is wrong' })
                return
            }

            const accessToken = {
                userId: String(user._id),
                sessionKey: crypto.randomUUID()
            }

            const token = createJWT(accessToken)

            await UserModel.findByIdAndUpdate(user._id, { token })
    
            res.json({ token, user: {email: user.email, subscription: user.subscription} })
        }
        } catch (error) {
            next(error)
        }
    
}

const userLogOut = async (req, res, next) => {
    try {
        const userEx = req.user
        const user = await UserModel.findById(userEx._id)
        if (!user) {
            throw createHttpException('Not authorized', 404)
        } else {
            const token = null
            await UserModel.findByIdAndUpdate(user._id, { token })
            res.json({ message: 'LogOut was complete!' })
        }
    } catch (error) {
        next(error)
    }
}

const userCurrent = async (req, res, next) => {
    try {
        const userEx = req.user
        const user = await UserModel.findById(userEx._id)
        console.log(user)
        if (!user) {
            throw createHttpException('Not authorized', 404)
        } else {
            res.json({ email: user.email, subscription: user.subscription })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userRegister,
    userLogin,
    userLogOut,
    userCurrent
}