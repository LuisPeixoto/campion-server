const mongoose = require('mongoose')

const URI = process.env.MONGO_DB

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true
  }, () => {
    console.log('Connected DB')
  })
}

module.exports = connectDB
