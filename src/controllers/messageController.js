const Message = require('../models/Message')
const LoremIpsum = require('lorem-ipsum').LoremIpsum
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const messageController = {
  async get (req, res) { // retorna o conteudo da mensagem atraves do id
    const { chatId } = req.params
    try {
      const time1 = new Date().getUTCMilliseconds()
      const messages = await Message.find({ chatId }).sort({ createdAt: -1 })
      const time2 = new Date().getUTCMilliseconds()
      const result = time2 - time1

      console.log(result)

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
      const time1 = new Date().getUTCMilliseconds()
      const TempoSavedMessage = await Message.aggregate([{ $collStats: { latencyStats: { histograms: true } } }])
      const time2 = new Date().getUTCMilliseconds()
      const result = time2 - time1

      console.log(result)

      /// //////// parte do socket io /////
      const { io, connectedUsers } = req
      const { receiver, sender, text } = req.body

      // console.log(connectedUsers[receiver])

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
  },
  async sendMessage (req, res) {
    const { sender, receiver, chatId } = req.params

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    })

    const data = {
      chatId: chatId,
      sender: sender,
      receiver: receiver,
      text: lorem.generateParagraphs(1)
    }
    const newMessage = new Message(data)

    try {
      // console.time('Tempo')
      const time1 = Date.now()
      const savedMessage = await newMessage.save()
      const time2 = Date.now()
      const result = time2 - time1
      console.log(result)

      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

}

module.exports = messageController
