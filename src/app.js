const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' })
})

module.exports = app
