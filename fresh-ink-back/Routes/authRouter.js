const express = require('express')
const router = express.Router()
const util = require('../Utils/authUtils.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const { findUserByEmail } = require('../Utils/userUtils.js')

const jsonParser = bodyParser.json()

module.exports = (app, passport) => {
  app.use(
    cors({
      origin: 'https://localhost:3000', // Frontend origin
      credentials: true,
    }),
  )

  app.use('/auth', router)

  router.post(
    '/login',
    jsonParser,
    passport.authenticate('local'),
    async (req, res, next) => {
      try {
        const { email, password } = req.body

        const response = await util.login(email, password)
        if (req.isAuthenticated) {
          response.authType = 'local'
          res.status(200).send(response)
        }
      } catch (err) {
        console.log(err)
      }
    },
  )

  router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user })
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  })

  router.post('/logout', function (req, res, next) {
    //I had to include the user before the callback when calling the logout function
    req.logOut(req.user, function (err) {
      if (err) {
        return next(err)
      }
      return res.status(200).json({ message: "Logged out successfully" });

      res.redirect('https://localhost:3000/')
    })
  })

  router.get('/check-session', (req, res) => {
    res.json({ user: req.user || null })
  })

  //facebook login route
  router.get('/facebook', (req, res, next) => {
    passport.authenticate('facebook')(req, res, next)
  })

  //facebook callback route
  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
      await util.facebookLogin(req.user.email, req.user.id)
      if (req.isAuthenticated) {
        res.redirect('https://localhost:3000/')
      } else {
        console.log('naw')
      }
    },
  )

  // Google Login Endpoint
  router.get('/google', (req, res, next) => {
    const redirectUri = 'https://localhost:3003/auth/google/callback'
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      callbackURL: redirectUri,
    })(req, res, next)
  })

  // Google Login Callback Endpoint
  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      await util.googleLogin(req.user.email, req.user.id)
      if (req.isAuthenticated) {
        res.redirect('https://localhost:3000/')
      } else {
        console.log('naw')
      }
    },
  )

  app.post(
    '/google/jwt',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      try {
        const token = req.body
        const getInfo = await util.verifyToken(token.credential)

        if (getInfo) {
          util.registerWithGoogle(getInfo.email, getInfo.sub)
        }

        if (req.isAuthenticated) {
          res.redirect('https://localhost:3000/')
        }
      } catch (err) {
        res.status(400).json({ error: 'Invalid token' })
      }
    },
  )
}
