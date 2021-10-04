const mongoose = require('mongoose')

const { Schema } = mongoose

const chatSchema = new Schema({ //definindo schema
  members: {
    type: Array //vetor com os ids dos usuarios que estam conversando
  }
},
{ timestamps: true } //horario em que foi iniciado a conversa
)

module.exports = mongoose.model('chat', chatSchema)
