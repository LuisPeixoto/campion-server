const express = require('express')
const dotenv = require('dotenv')
const app = express()
const auth = require('./routes/auth.routes')
const user = require('./routes/user.routes')

app.use(express.json())
dotenv.config()

app.use('/auth', auth)
app.use('/user', user)

module.exports = app
