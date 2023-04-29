const { json } = require('express')
const express = require('express')
const { userRegister, userLogin, userLogOut, userCurrent, updateAvatar } = require('../../controllers')
const { userAuthMiddleware, upload } = require('../../middlewares')
const router = express.Router()


router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/logout', userAuthMiddleware, userLogOut)

router.get('/current', userAuthMiddleware, userCurrent)

router.patch('/avatars', userAuthMiddleware, upload.single('avatar'), updateAvatar)

module.exports = router