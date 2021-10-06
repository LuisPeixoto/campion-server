const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/', userController.get) // RETORNA TODAS INFORMACOES DO USUARIO DE ACORDO COM O USERNAME
router.get('/all', userController.getAll) // RETORNA TODOS OS USUARIOS
router.get('/followers/:userId', userController.followers) // RETORNA UMA LISTA DE USUARIO DE ACORDO COM O ID
router.put('/:id/follow', userController.follow) // SEGUIR UM USUARIO DE ACORDO COM O ID
router.put('/:id/unfollow', userController.unfollow) // DEIXA DE SEGUIR UM USUARIO

module.exports = router
