const Message = require('../models/Message')
const LoremIpsum = require('lorem-ipsum').LoremIpsum
const fs = require('fs')

const testController = {
  async getAllMessagesChat (req, res) { // retorna o conteudo de mensagem atraves do id
    const { chatId } = req.params
    try {
      const time1 = Date.now()
      await Message.find({ chatId }).sort({ createdAt: -1 })
      const time2 = Date.now()
      const result = time2 - time1

      fs.appendFileSync('testReadMessage.txt', `${result / 1000}\n`)

      res.status(200).json('ok')
    } catch (error) {
      console.log(error)
      if (error) { return res.status(500).send({ error: error }) }
    }
  },
  async sendMessage (req, res) {
    const { sender, receiver, chatId } = req.params

    try {
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

      const time1 = Date.now()
      await newMessage.save()
      const time2 = Date.now()

      const result = time2 - time1

      fs.appendFileSync('testSendMessage.txt', `${result / 1000}\n`)

      res.status(200).json('ok')
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  async sendMessage2 (req, res) {
    const { sender, receiver, chatId } = req.params

    try {
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

      const time1 = Date.now()
      await newMessage.save()
      const time2 = Date.now()

      const result = time2 - time1

      fs.appendFileSync('testSendMessage2.txt', `${result / 1000}\n`)

      res.status(200).json('ok')
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

}

module.exports = testController
