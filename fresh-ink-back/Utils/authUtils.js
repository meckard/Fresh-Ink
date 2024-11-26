const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { findUserByEmail, createUser, findUserByFacebookId, updateUser } = require('./userUtils')

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

const facebookLogin = async (userId, facebookId, displayName) => {

  try {
    const user = await findUserByFacebookId(facebookId)

    if(!user) {
      return updateUser(Facebook, { facebookId, displayName }, userId  )
    }

    return user
  } catch {
    throw createError(500, err)
  }
    
}

const googleLogin = async (userId, googleId, displayName) => {

  try {
    const user = await findUserByFacebookId(googleId)

    if(!user) {
      return updateUser(google, { googleId, displayName }, userId  )
    }

    return user
  } catch {
    throw createError(500, err)
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
  googleLogin,
  facebookLogin
}
