const bcrypt = require('bcrypt')

exports.validatePassword = async (bodyPassword, userPassword) => {
  return await bcrypt.compare(bodyPassword, userPassword)
}

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 8)
}
