const mongoose = require('mongoose')

const { Schema } = mongoose

const messageSchema = new Schema({
  id: {
    type: String,
    required: true,
    min: 3,
    unique: true
  },

  sender: {
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
