const express = require('express') // cria o servidor
const dotenv = require('dotenv') // biblioteca para criar variaveis de ambiente
const app = express() // inicia o servidor
const auth = require('./routes/auth.routes')
const user = require('./routes/user.routes')
const chats = require('./routes/chats.routes')
const messages = require('./routes/messages.routes')
const test = require('./routes/test.routes')
const uploadConfig = require('./config/upload')
const multer = require('multer') // upload de imagens
const path = require('path')
const helmet = require('helmet')
const server = require('http').Server(app) // definir configuracao do servidor

/// //////////////// configuracao do socket io /////////////
const io = require('socket.io')(server)

const connectedUsers = {}

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers
  return next()
})

app.use(express.json())
dotenv.config()

app.use('/upload', express.static(path.join(__dirname, '..', '..', '/upload')))

app.use(helmet())

const upload = multer({ storage: uploadConfig })
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json({ message: 'file uploaded' })
  } catch (error) {
    console.error(error)
  }
})

/// ////////// DEFINI as rotas da aplicacao ///////////
app.use('/auth', auth)
app.use('/user', user)
app.use('/chats', chats)
app.use('/message', messages)
app.use('/test', test)

/// /////////////// definir porta 3000 para aplicacao
server.listen(3000, () => {
  io.on('connection', (socket) => {
    const { user_id } = socket.handshake.query
    connectedUsers[user_id] = socket.id
    // console.log(socket)
  })
})

module.exports = app
