const mongoose = require('mongoose')//biblioteca

const { Schema } = mongoose

const chatSchema = new Schema({ //criando atributos
  members: {
    type: Array //usuarios que fazem parte da conversa
  }
},
{ timestamps: true } //hora de criação da conversa
)

module.exports = mongoose.model('chat', chatSchema) //exportando a função
