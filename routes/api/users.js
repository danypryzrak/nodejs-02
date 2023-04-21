const { json } = require('express')
const express = require('express')
const { userRegister, userLogin, userLogOut, userCurrent } = require('../../controllers')
const { userAuthMiddleware } = require('../../middlewares')
const router = express.Router()

router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/logout', userAuthMiddleware, userLogOut)

router.get('/current', userAuthMiddleware, userCurrent)

module.exports = router