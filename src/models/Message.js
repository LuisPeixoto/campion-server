const mongoose = require('mongoose')

const { Schema } = mongoose

const messageSchema = new Schema({ // definindo schema
  chatId: { //o id da conversa qual essa menssagem pertence
    type: String,
    required: true,
    min: 3,
    unique: true
  },

  sender: { //remetente id
    type: String
  },
  text: { //menssagem a ser enviada
    type: String
  }
},
{
  timestamps: true //hora de envio
})

module.exports = mongoose.model('message', messageSchema)
