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

const createUser = async (email, firstName, lastName) => {
  const statment = `INSERT INTO public.user(email, first_name, last_name)
                          VALUES($1, $2, $3)`

  const result = await db.query(statment, [email, firstName, lastName])

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
  createUser,
  updateUser,
  updatePassword,
}
