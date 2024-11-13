const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { findUserByEmail, createUser } = require('./userUtils')

const login = async (email, password) => {
  try {
    const userExists = await findUserByEmail(email)
    if (!userExists) {
      throw createError(401, 'Incorrect username or password')
    }

    const passwordCompare = await bcrypt.compare(password, userExists.password)

    if (!passwordCompare) {
      throw createError(401, 'Incorrect username or password')
    }

    return userExists
  } catch (err) {
    console.log(err)
  }
}

const register = async (email, password) => {
  try {
    const userExists = await findUserByEmail(email)

    if (userExists) {
      throw createError(409, 'Email already in use')
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return await createUser(email, hashedPassword)
  } catch (err) {
    throw createError(500, err)
  }
}

module.exports = {
  register,
  login,
}
