const express = require('express')
const router = express.Router()
const util = require('../Utils/authUtils.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const jsonParser = bodyParser.json()

module.exports = (app, passport) => {
  //parses req.body
  app.use(cors())
  app.use(jsonParser)
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/auth', router)

  router.post('/register', async (req, res, next) => {
    try {
      const response = await util.register(req.body.email, req.body.password)

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

  //facebook login route
  router.get('/facebook', passport.authenticate('facebook'))

  //facebook callback route
  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('/')
    },
  )

  // Google Login Endpoint
  router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

  // Google Login Callback Endpoint
  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      res.redirect('/')
    },
  )

  app.post('/google/jwt', async (req, res) => {
    try {
      const { token } = req.body
      const email = await verifyToken(token)
      console.log('Verified email:', email)

      // Save email to your database (mock example)
      res.json({ message: 'User saved', email })
    } catch (err) {
      console.error('Error verifying token:', err)
      res.status(400).json({ error: 'Invalid token' })
    }
  })
}
