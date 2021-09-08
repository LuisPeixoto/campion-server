const http = require('http')
const app = require('./app')
const config = require('./config')
const connectDB = require('./database')
const socketIo = require('./services/socketio')

connectDB()

const server = http.createServer(app)

socketIo(server)

server.listen(config.app.port)
