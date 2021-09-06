const express = require('express')
const dotenv = require('dotenv')
const app = express()
const auth = require('./routes/auth.routes')

app.use(express.json())
dotenv.config()

app.use('/auth', auth)

module.exports = app
