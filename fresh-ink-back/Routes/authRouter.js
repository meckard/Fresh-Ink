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
          console.log('response', response)
          res.status(200).send(response)
          console.log('Logged In!')
        }
      } catch (err) {
        console.log(err)
      }
    },
  )

  router.get('/status', (req, res) => {
    console.log('Session:', req.session) // Check session details
    console.log('User:', req.user)
    if (req.isAuthenticated()) {
      console.log('am authed')
      res.json({ user: req.user })
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  })

  router.post('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' })
      }
      res.json({ message: 'Logged out successfully' })
    })
  })

  //facebook login route
  router.get('/facebook', (req, res, next) => {
    console.log('FBSession:', req.session) // Check session data
    console.log('FBUser:', req.user)
    /* const redirectUri = 'https://localhost:3003/auth/facebook/callback' */
    passport.authenticate(
      'facebook' /* , {
      scope: ['email'],
      callbackURL: redirectUri, 
    } */,
    )(req, res, next)
  })

  //facebook callback route
  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    async (req, res) => {
      await util.facebookLogin(req.user.email, req.user.id)
      if (req.isAuthenticated) {
        console.log('session')
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
      console.log('callback user', req.user)
      await util.googleLogin(req.user.email, req.user.id)
      if (req.isAuthenticated) {
        console.log('session')
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
          console.log('session')
          res.redirect('https://localhost:3000/')
        }
      } catch (err) {
        console.error('Error verifying token:', err)
        res.status(400).json({ error: 'Invalid token' })
      }
    },
  )
}
