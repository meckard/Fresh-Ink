const express = require('express')
const router = express.Router()
const db = require('../queries')
const bodyParser = require('body-parser')
const util = require('../Utils/userUtils')

const jsonParser = bodyParser.json()

module.exports = (app) => {
  //allows use of req.body
  app.use(jsonParser)

  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/users', router)

  router.get('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params
      const statement = 'SELECT * FROM public.user WHERE id = $1'
      const values = [userId]

      const result = await db.query(statement, values)

      const { id, email, first_name, last_name } = result.rows[0]

      res.status(200).send([id, email, first_name, last_name])
    } catch (err) {
      next(err)
    }
  })

  router.put('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params
      const { column, info } = req.body

      const response = await util.updateUser(column, info, userId)

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })
}
