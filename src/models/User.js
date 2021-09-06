const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    unique: true
  },

  name: {
    type: String,
    required: true,
    min: 3
  },

  password: {
    type: String,
    required: true,
    min: 6
  },

  avatar: {
    type: String,
    default: ''
  },

  followers: {
    type: Array,
    default: []
  },

  followings: {
    type: Array,
    default: []
  }

})

module.exports = mongoose.model('user', userSchema)
