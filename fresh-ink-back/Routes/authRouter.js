const express = require('express')
const router = express.Router()
const util = require('../Utils/authUtils.js')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

module.exports = (app, passport) => {
  //parses req.body
  app.use(jsonParser)
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/auth', router)

  router.post('/register', async (req, res, next) => {
    try {
      const response = await util.register(
        req.body.email,
        req.body.firstName,
        req.body.lastName,
      )

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  router.post('/update-password', async (req, res, next) => {
    try {
      const response = await util.updatePassword(
        req.body.id,
        req.body.password,
        req.body.email,
      )

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  router.post(
    '/login',
    passport.authenticate('local'),
    async (req, res, next) => {
      try {
        const { email, password } = req.body

        const response = await util.login(email, password)

        res.status(200).send(response)
        console.log('Logged In!')
      } catch (err) {
        console.log(err)
      }
    },
  )
}
