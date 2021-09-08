function socketIo (server) {
  const io = require('socket.io')(server)

  const users = []

  const addUsers = (userId, socketId) => {
    if (!users.some((user) => user.userId != userId)) {
      users.push({ userId, socketId })
    }
  }

  const removeUsers = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
  }

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
  }

  io.on('connection', (socket) => {
    console.log('connected')

    socket.on('addUser', (userId) => {
      addUsers(userId, socket.id)
      io.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId)
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text
      })
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
      removeUsers(socket.id)
      io.emit('getUsers', users)
    })
  })
}

module.exports = socketIo
