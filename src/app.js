const express = require('express')
const dotenv = require('dotenv')
const app = express()
const auth = require('./routes/auth.routes')
const user = require('./routes/user.routes')
const chats = require('./routes/chats.routes')
const messages = require('./routes/messages.routes')
const uploadConfig = require('./config/upload')
const multer = require('multer')
const path = require('path')
const helmet = require('helmet')

app.use(express.json())
dotenv.config()

app.use('/upload', express.static(path.join(__dirname, '..', '..', '/upload')))

app.use(helmet()) //

const upload = multer({ storage: uploadConfig })
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json({ message: 'file uploaded' })
  } catch (error) {
    console.error(error)
  }
})

app.use('/auth', auth)
app.use('/user', user)
app.use('/chats', chats)
app.use('/message', messages)

module.exports = app
