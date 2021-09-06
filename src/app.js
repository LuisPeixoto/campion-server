const express = require('express')
const dotenv = require('dotenv')
const app = express()
const auth = require('./routes/auth.routes')
const user = require('./routes/user.routes')
const messages = require('./routes/messages.routes')

app.use(express.json())
dotenv.config()

app.use('/auth', auth)
app.use('/user', user)
app.use('/message', messages)

module.exports = app
