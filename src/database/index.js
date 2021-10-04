const mongoose = require('mongoose')

const URI = 'mongodb+srv://campion_luispeixoto:luispeixoto@campion-cluster.lsyp3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//Uri para acessar o banco (por favor não hackeiem)

const connectDB = async () => { //função para  fazer a conexão com o banco
  await mongoose.connect(URI, { //esperando conexão
    useUnifiedTopology: true 
  }, () => {
    console.log('Connected DB') //confirmação de conexão
  })
}

module.exports = connectDB
