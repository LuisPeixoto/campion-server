const Message = require('../models/Message')

const messageController = {
  async get (req, res) {
    const { chatId } = req.params
    try {
      const messages = await Message.find({ chatId })
      res.status(200).json(messages)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },
  async newMessage (req, res) {
    const newMessage = new Message(req.body)

    try {
      const savedMessage = await newMessage.save()
      res.status(200).json(savedMessage)
    } catch (err) {
      res.status(500).json(err)
    }
  }

}

module.exports = messageController
