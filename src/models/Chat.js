const mongoose = require('mongoose')

const { Schema } = mongoose

const chatSchema = new Schema({
  members: {
    type: Array
  }
},
{ timestamps: true }
)

module.exports = mongoose.model('chat', chatSchema)
