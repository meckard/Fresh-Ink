const db = require('../queries')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

const findUserByEmail = async (email) => {
  try {
    const userExist = await db.query(
      `SELECT * FROM public.user WHERE email = $1`,
      [email],
    )

    if (userExist.rows?.length) {
      return userExist.rows[0]
    }

    return null
  } catch (err) {
    console.log(err)
  }
}

const findUserByFacebookId = async (id) => {
  try {
    const userExists = await db.query(
      `SELECT * FROM public.user WHERE facebook = $1`,
      [id],
    )

    if (userExists.rows?.length) {
      return userExists.rows[0]
    }

    return null
  } catch (err) {
    throw new Error(err)
  }
}

const findUserByGoogleId = async (id) => {
  try {
    const userExists = await db.query(
      `SELECT * FROM public.user WHERE google = $1`,
      [id],
    )

    if (userExists.rows?.length) {
      return userExists.rows[0]
    }

    return null
  } catch (err) {
    throw new Error(err)
  }
}

const createUser = async (email, password) => {
  const statment = `INSERT INTO public.user(email, password)
                          VALUES($1, $2)`

  const result = await db.query(statment, [email, password])

  if (result.rows?.length) {
    return result.rows[0]
  }

  return null
}

const createUserWithGoogle = async (email, googleId) => {
  const statment = `INSERT INTO public.user(email, google)
                          VALUES($1, $2)`

  const result = await db.query(statment, [email, googleId])

  if (result.rows?.length) {
    return result.rows[0]
  }

  return null
}

const createUserWithFacebook = async (email, facebookId) => {
  const statment = `INSERT INTO public.user(email, facebook)
                          VALUES($1, $2)`

  const result = await db.query(statment, [email, facebookId])

  if (result.rows?.length) {
    return result.rows[0]
  }

  return null
}

const updateUser = async (column, info, userId) => {
  const statement = `UPDATE public.user SET ${column} = $1::text WHERE id = $2::int`
  const values = [column, info, userId]

  const result = await db.query(statement, [info, userId])

  return result
}

const updatePassword = async (userId, newPassword, email) => {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
  const statement = 'UPDATE public.user SET password = $1 WHERE id = $2'

  const user = await findUserByEmail(email)

  if (!user) {
    throw createError(404, 'User not found')
  }

  const result = await db.query(statement, [hashedPassword, userId])

  if (result.rows?.length) {
    return result
  }

  return null
}

module.exports = {
  findUserByEmail,
  findUserByFacebookId,
  findUserByGoogleId,
  createUser,
  updateUser,
  createUserWithFacebook,
  updatePassword,
  createUserWithGoogle,
}
