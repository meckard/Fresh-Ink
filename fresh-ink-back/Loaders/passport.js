const passport = require('passport')
const LocalStrategy = require('passport-local')
const util = require('../Utils/authUtils')
const FacebookStrategy = require('passport-facebook')

//initialize passport and localstrategy
module.exports = (app) => {
  app.use (passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    done(null, { id })
  })

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const login = await util.login(username, password)

          return done(null, login)
        } catch (err) {
          return done(err)
        }
      },
    ),
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_LOGIN_ID,
        clientSecret: process.env.FACEBOOK_LOGIN_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = 'hello'
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      },
    ),
  )

  return passport
}
