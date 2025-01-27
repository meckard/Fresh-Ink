const passport = require('passport')
const LocalStrategy = require('passport-local')
const util = require('../Utils/authUtils')
const {
  findUserByFacebookId,
  findUserByEmail,
  findUserByGoogleId,
} = require('../Utils/userUtils')
const cors = require('cors')
const session = require('express-session')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oidc')

//initialize passport and localstrategy
module.exports = (app) => {
  /* app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        sameSite: 'None',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  ) */
  app.use(passport.initialize())
  app.use(passport.session())
  /* app.use(
    cors({
      origin: 'https://localhost:3000', // Specify the allowed origin
      credentials: true,
    }),
  ) */

  passport.serializeUser((user, done) => {
    console.log('serial:', user)
    done(null, { id: user.id, authType: user.authType, email: user.email })
  })

  passport.deserializeUser((data, done) => {
    console.log('deserial:', data)
    const { id, authType, email } = data

    if (authType === 'google') {
      // Fetch the user from the database based on Google ID
      findUserByGoogleId(id)
        .then((user) => done(null, user))
        .catch(done)
    } else if (authType === 'facebook') {
      // Fetch the user from the database based on Facebook ID
      console.log('facebook deser')
      findUserByFacebookId(id)
        .then((user) => done(null, user))
        .catch(done)
    } else if (authType === 'local') {
      // Fetch the user from the database based on Local ID
      console.log('localdeser')
      findUserByEmail(email)
        .then((user) => done(null, user))
        .catch(done)
    } else {
      done(new Error('Invalid authentication type'))
    }
  })

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await util.login(email, password)
          user.authType = 'local'
          console.log(user)
          return done(null, user)
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
        callbackURL: 'https://localhost:3003/auth/facebook/callback',
        state: true,
        profileFields: ['id', 'emails', 'name'],
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          id: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails[0].value,
          authType: 'facebook',
        }
        console.log('strategy user', user)
        done(null, user)
      },
    ),
  )

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://localhost:3003/auth/google/callback',
      },
      (issuer, profile, done) => {
        console.log(profile)
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails,
          authType: 'google',
        }
        done(null, user)
      },
    ),
  )

  return passport
}
