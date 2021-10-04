const mongoose = require('mongoose')

const { Schema } = mongoose

const messageSchema = new Schema({ //definindo schema
  chatId: {
    type: String //id da conversa a qual essa menssagem pertence
  },

  sender: {
    type: String //id do usuario remetente
  },
  receiver: {
    type: String //id do usuario destinatario
  },
  text: {
    type: String //texto da menssagem
  }
},
{
  timestamps: true //horario da menssagem
})

module.exports = mongoose.model('message', messageSchema)
