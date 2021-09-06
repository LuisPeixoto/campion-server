const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/', userController.get)
router.put('/:id', userController.update)
router.get('/followers/:userId', userController.followers)
router.put('/:id/follow', userController.follow)
router.put('/:id/unfollow', userController.unfollow)

module.exports = router
