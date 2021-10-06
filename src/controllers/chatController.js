const Chat = require('../models/Chat')
const User = require('../models/User')
const Message = require('../models/Message')

const chatController = {
  async get (req, res) { // retorna as informacoes do chat atraves do id do usuario
    const { userId } = req.params
    try {
      const chats = await Chat.find({
        members: { $in: [userId] }
      }, { chatId: 1, members: 1, createdAt: 1 })

      const users_id = []
      const messages_id = []

      chats.forEach(chat => {
        users_id.push(chat.members.find(id => id !== userId))// Guarda o id do usuario que esta conversando
        messages_id.push(chat._id) // guarda o id da ultima mensagem do chat
      })

      const users = await User.find({ _id: { $in: users_id } }, { username: 1, name: 1, avatar: 1 })

      // const messages = await Message.find({ chatId: { $in: messages_id } }, { text: 1, createdAt: 1 }).sort({ createdAt: -1 }).distinct('chatId')

      const messages = []

      for (const message_id of messages_id) {
        const message = await Message.findOne({ chatId: { $in: message_id } }, { text: 1, createdAt: 1 }).sort({ createdAt: -1 }) // pegar a ultima mensagem daquele id
        messages.push(message)
      }

      // messages[index].createdAt ? messages[index].createdAt :
      const data = chats.map((chat, index) => { // Colocar no formato ideal para retorno
        let date = chat.createdAt
        let lastMessage = 'Diga "oi"'

        if (messages[index]) {
          date = messages[index].createdAt
          lastMessage = messages[index].text
        }

        return {
          _id: chat._id,
          members: chat.members,
          createdAt: date,
          lastMessage: lastMessage,
          user: {
            username: users[index].username,
            name: users[index].name,
            avatar: users[index].avatar
          }
        }
      })

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error })
    }
  },
  async newChat (req, res) { // criar um novo chat atraves do id do remetente e destinatario
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
