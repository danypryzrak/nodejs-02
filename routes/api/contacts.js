const { json } = require('express')
const express = require('express')
const { getContacts, getContactById, createContact, deleteContact, updateContactById, updateFavorite } = require('../../controllers')
const { userAuthMiddleware } = require('../../middlewares')

const router = express.Router()


router.get('/', getContacts)

router.get('/:contactId', getContactById)

router.post('/', userAuthMiddleware, createContact)

router.delete('/:contactId', userAuthMiddleware, deleteContact)

router.put('/:contactId', userAuthMiddleware, updateContactById)

router.patch('/:contactId/favorite', userAuthMiddleware, updateFavorite)

module.exports = router
