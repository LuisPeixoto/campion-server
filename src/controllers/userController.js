const User = require('../models/User')
const { hashPassword } = require('../utils/hash')

const userController = { // retorna o usuario atraves do username
  async get (req, res) {
    const { username } = req.query
    try {
      const user = await User.findOne({ username })
      const { password, updateAt, ...other } = user._doc
      res.status(200).json(other)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },

  async search (req, res) {
    const { user } = req.query
    try {
      const users = await User.find({
        $or: [
          { username: { $regex: user, $options: 'i' } },
          { name: { $regex: user, $options: 'i' } }
        ]
      })

      const data = users.map(user => {
        return {
          _id: user._id,
          name: user.name,
          username: user.username,
          avatar: user.avatar
        }
      })

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },

  async getAll (req, res) {
    try {
      const users = await User.find({}, { name: 1, username: 1, avatar: 1 })
      res.status(200).json(users)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },

  async update (req, res) { // Atualiza as informações do usuario
    const { id } = req.params

    if (req.body.userId === req.params.id) {
      try {
        if (req.body.password) {
          req.body.password = await hashPassword(req.body.password)
        }

        const user = await User.findByIdAndUpdate(id, {
          $set: req.body
        })

        user.save()
        res.status(200).json({ message: 'updated' })
      } catch (error) {
        console.log(error)
        if (error) { return res.status(500).send({ error: error }) }
      }
    }
  },

  async following (req, res) { // retorna todos os seguidores de um usuario
    try {
      const user = await User.findById(req.params.userId)

      console.log(user.followings)

      const followers = await Promise.all(
        user.followings.map((followerId) => {
          return User.findById(followerId)
        })
      )

      const followingList = []

      followers.map((follower) => {
        const { _id, username, name, avatar } = follower
        followingList.push({ _id, username, name, avatar })
      })
      res.status(200).json(followingList)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },

  async follower (req, res) { // retorna todos os seguidores de um usuario
    try {
      const user = await User.findById(req.params.userId)

      const followers = await Promise.all(
        user.followers.map((followerId) => {
          return User.findById(followerId)
        })
      )

      const followersList = []

      followers.map((follower) => {
        const { _id, username, name, avatar } = follower
        followersList.push({ _id, username, name, avatar })
      })
      res.status(200).json(followersList)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },

  async contacts (req, res) { // retorna todos os seguidores de um usuario
    try {
      const user = await User.findById(req.params.userId)
      const contactsId = user.followings.filter(followerId => user.followers.includes(followerId))

      const contacts = await Promise.all(
        contactsId.map((contactId) => {
          return User.findById(contactId, { name: 1, username: 1, avatar: 1 })
        })

      )
      res.status(200).json(contacts)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },

  async follow (req, res) { // seguir um outro um usuario atraves de um id
    const { id } = req.params
    if (req.body.userId !== id) {
      try {
        const user = await User.findById(id)
        const currentUser = await User.findById(req.body.userId)

        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } })
          await currentUser.updateOne({ $push: { followings: id } })
        }
        res.status(200).json('followed')
      } catch (error) {
        console.log(error)
        if (error) { return res.status(500).send({ error: error }) }
      }
    }
  },

  async unfollow (req, res) { // deixa de seguir um usuario atraves do id
    const { id } = req.params
    if (req.body.userId !== id) {
      try {
        const user = await User.findById(id)
        const currentUser = await User.findById(req.body.userId)

        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } })
          await currentUser.updateOne({ $pull: { followings: id } })
        }
        res.status(200).json('Unfollowed')
      } catch (error) {
        console.log(error)
        if (error) { return res.status(500).send({ error: error }) }
      }
    }
  }

}

module.exports = userController
