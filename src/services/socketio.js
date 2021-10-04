function socketIo (server) {
  const io = require('socket.io')(server)

  let users = []

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId })
  }

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
  }

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
  }

  io.on('connection', (socket) => {
    // when ceonnect
    console.log('a user connected.')

    // take userId and socketId from user
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id)
      io.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId)
      console.log(user)
      io.to(user.socketId).emit('getMessage', {
        text,
        user: {
          id: senderId
        }
      })
    })

    // when disconnect
    socket.on('disconnect', () => {
      console.log('a user disconnected!')
      removeUser(socket.id)
      io.emit('getUsers', users)
    })
  })
}

module.exports = socketIo
