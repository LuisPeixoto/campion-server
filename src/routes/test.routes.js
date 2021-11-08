const express = require('express')
const testController = require('../controllers/testController')
const router = express.Router()

router.get('/:chatId', testController.getAllMessagesChat) // RETORNA TODAS MENSAGENS DE UM CHAT DE ACORDO COM O ID
router.get('/:chatId/:sender/:receiver', testController.sendMessage) // CRIAR UMA NOVA MENSAGEM

module.exports = router
