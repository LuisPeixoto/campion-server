const mongoose = require('mongoose')

const URI = 'mongodb+srv://campion_luispeixoto:luispeixoto@campion-cluster.lsyp3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true
  }, () => {
    console.log('Connected DB')
  })
}

module.exports = connectDB
