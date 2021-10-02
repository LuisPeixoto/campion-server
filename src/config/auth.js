const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  jwt: {
    secret: process.env.PRIVATE_KEY,
    expiresIn: process.env.EXPIRE_AUTH
  }
}
