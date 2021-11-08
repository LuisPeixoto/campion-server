const express = require('express')
const testController = require('../controllers/testController')
const router = express.Router()

router.get('/:chatId', testController.getAllMessagesChat) // RETORNA TODAS MENSAGENS DE UM CHAT DE ACORDO COM O ID
router.get('/:chatId/:sender/:receiver', testController.sendMessage) // CRIAR UMA NOVA MENSAGEM
router.get('/user2/:chatId/:sender/:receiver', testController.sendMessage2) // CRIAR UMA NOVA MENSAGEM user2

module.exports = router
