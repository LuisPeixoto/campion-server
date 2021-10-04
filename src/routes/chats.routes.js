const express = require('express')
const chatController = require('../controllers/chatController')
const router = express.Router()

router.get('/:userId', chatController.get) // RETORNAR TODOS CHATS DE UM DETERMINADO USUARIO
router.post('/', chatController.newChat) // CRIAR NOVO CHAT
// router.get('/find/:userId/:secondUserId', chatController.getChatTwoUsers)

module.exports = router
