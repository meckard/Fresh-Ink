const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { findUserByEmail, createUser, findUserByFacebookId, updateUser, createUserWithGoogle, findUserByGoogleId } = require('./userUtils')
const { OAuth2Client } = require('google-auth-library');

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
      return updateUser(facebook, facebookId, userId  )
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
      return updateUser(google, googleId, userId  )
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

const registerWithGoogle = async (email, googleId) => {
  try{
    const userExists = await findUserByEmail(email)
    const googleIdExists = await findUserByGoogleId(googleId)

    if (googleIdExists) {
      return email, googleId
    }

    if (userExists) {
      throw createError(409, 'Email already in use')
    }

    return await createUserWithGoogle(email, googleId)
  } catch (err) {
    throw createError(500, err)
  }
}

const client = new OAuth2Client('540016111823-r9lif214uo6g7h36dsvo7u84lqgaegiu.apps.googleusercontent.com');

async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '540016111823-r9lif214uo6g7h36dsvo7u84lqgaegiu.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();
  console.log('User info:', payload);

  // Get user info
  const info = {
    email: payload.email,
    sub: payload.sub
  }
  return info;
}

module.exports = {
  register,
  login,
  googleLogin,
  facebookLogin,
  registerWithGoogle,
  verifyToken
}
