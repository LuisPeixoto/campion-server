const User = require('../models/User')
const { hashPassword } = require('../utils/hash')

const userController = {
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

  async update (req, res) {
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

  async followers (req, res) {
    try {
      const user = await User.findById(req.params.userId)
      const followers = await Promise.all(
        user.followings.map((followerId) => {
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

  async follow (req, res) {
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

  async unfollow (req, res) {
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
