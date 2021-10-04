const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({ //definindo schema
  username: {  //apelido do usuario, precisa ser unico
    type: String,
    required: true,
    min: 3,
    unique: true
  },

  name: { //nome do usuario
    type: String,
    required: true,
    min: 3
  },

  password: { //senha
    type: String,
    required: true,
    min: 8
  },

  avatar: { //url da foto do usuario
    type: String,
    default: ''
  },

  followers: { //vetor com o id dos seguidores
    type: Array,
    default: []
  },

  followings: { //vetor com o id dos seguidos
    type: Array,
    default: []
  }

})

module.exports = mongoose.model('user', userSchema)
