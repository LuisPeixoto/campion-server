const express = require('express')
const messageController = require('../controllers/messageController')
const router = express.Router()

router.get('/:chatId', messageController.get) // TODAS MENSAGENS DE UM CHAT DE ACORDO COM O ID
router.post('/', messageController.newMessage) // CRIAR UMA NOVA MENSAGEM
router.get('/:chatId/:sender/:receiver', messageController.sendMessage) // CRIAR UMA NOVA MENSAGEM

module.exports = router
