const Message = require('../models/Message')

const messageController = {
  async get (req, res) { // retorna o conteudo da mensagem atraves do id
    const { chatId } = req.params
    try {
      const messages = await Message.find({ chatId }).sort({ createdAt: -1 })
      const data = messages.map((message) => {
        return {
          _id: message._id,
          text: message.text,
          createdAt: message.createdAt,
          user: {
            _id: message.sender
          }
        }
      })

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },
  async newMessage (req, res) { // criar uma nova mensagem através do texto, id do remetente e o destinatario
    const newMessage = new Message(req.body)
    try {
      const savedMessage = await newMessage.save()

      /// //////// parte do socket io /////
      const { io, connectedUsers } = req
      const { receiver, sender, text } = req.body

      const userSocket = connectedUsers[receiver]
      if (userSocket) { // VERIFICAR SE O USUARIO ESTA ONLINE
        const msg = {
          _id: new Date().getTime(),
          text,
          createdAt: new Date(),
          user: {
            _id: sender
          }
        }
        io.to(userSocket).emit('response', msg)
      }

      res.status(200).json(savedMessage)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
}

module.exports = messageController
