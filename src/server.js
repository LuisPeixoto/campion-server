const app = require('./app')
const connectDB = require('./database')
// const socketIo = require('./services/socketio')

connectDB()

// const server = http.createServer(app)

// socketIo(server)
