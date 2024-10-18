const createError = require('http-errors')
const bcrypt = require('bcrypt')
const findUser = require('./userUtils')

const login = async (email, password) => {
  try {
    const userExists = await findUser.findUserByEmail(email)
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

const register = async (email, firstName, lastName) => {
  try {
    const userExists = await findUserByEmail(email)

    if (userExists) {
      throw createError(409, 'Email already in use')
    }

    return await createUser(email, firstName, lastName)
  } catch (err) {
    throw createError(500, err)
  }
}

module.exports = {
  register,
  login,
}
