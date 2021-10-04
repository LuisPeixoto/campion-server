const mongoose = require('mongoose')

const { Schema } = mongoose

const messageSchema = new Schema({
  chatId: {
    type: String
  },

  sender: {
    type: String
  },
  receiver: {
    type: String
  },
  text: {
    type: String
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('message', messageSchema)
