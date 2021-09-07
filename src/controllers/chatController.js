const Chat = require('../models/Chat')

const chatController = {
  async get (req, res) {
    const { userId } = req.params
    try {
      const chat = await Chat.find({
        members: { $in: [userId] }
      })
      res.status(200).json(chat)
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error })
    }
  },
  async newChat (req, res) {
    const { senderId, receiverId } = req.body
    const chat = new Chat({
      members: [senderId, receiverId]
    })

    try {
      const savedChat = await chat.save()
      res.status(200).json(savedChat)
    } catch (error) {
      return res.status(500).send({ error })
    }
  },

  async getChatTwoUsers (req, res) {
    const { userId, secondUserId } = req.params
    try {
      const chat = await Chat.findOne({
        members: { $all: [userId, secondUserId] }
      })
      res.status(200).json(chat)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

}

module.exports = chatController
