const authConfig = require('../config/auth')
const User = require('../models/User')
const { sign } = require('jsonwebtoken')
const { hashPassword, validatePassword } = require('../utils/hash')

const authController = {
  async login (req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })

      if (!user) {
        return res.status(404).json({ message: 'error' })
      }

      const isValidPassword = await validatePassword(password, user.password)
      if (!isValidPassword) {
        return res.status(404).json({ message: 'error' })
      }

      /// CRIAR O TOKEN PARA O USUARIO

      const { secret, expiresIn } = authConfig.jwt

      const token = sign({}, secret, {
        subject: user._id.toString(),
        expiresIn
      })

      const data = {
        _id: user._id.toString(),
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        followers: user.followers,
        followings: user.followings

      }

      return res.status(200).json({ user: data, token })
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },

  async register (req, res) {
    try {
      const { username, name, password } = req.body
      const checkUsername = await User.findOne({ username })

      if (checkUsername) {
        return res.status(409).json({ message: 'username is already in use' })
      }

      const hashedPassword = await hashPassword(password)

      const user = new User({
        username,
        name,
        password: hashedPassword
      })

      user.save()
      res.status(200).json(user)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  }

}

module.exports = authController
