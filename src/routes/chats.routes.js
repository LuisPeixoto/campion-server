const express = require('express')
const chatController = require('../controllers/chatController')
const router = express.Router()

router.get('/:userId', chatController.get)
router.post('/', chatController.newChat)
router.get('/find/:userId/:secondUserId', chatController.getChatTwoUsers)

module.exports = router
