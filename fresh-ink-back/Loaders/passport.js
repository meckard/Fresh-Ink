const passport = require('passport')
const LocalStrategy = require('passport-local')
const util = require('../Utils/authUtils')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oidc')

//initialize passport and localstrategy
module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user.authType })
  })

  passport.deserializeUser((data, done) => {
    const { id, type } = data

    if (type === 'google') {
      // Fetch the user from the database based on Google ID
      util.findByGoogleId(id)
        .then((user) => done(null, user))
        .catch(done)
    } else if (type === 'facebook') {
      // Fetch the user from the database based on Facebook ID
      util.findByFacebookId(id)
        .then((user) => done(null, user))
        .catch(done)
    } else if (type === 'local') {
      // Fetch the user from the database based on Local ID
      User.findById(id)
        .then((user) => done(null, user))
        .catch(done)
    } else {
      done(new Error('Invalid authentication type'))
    }
  })

  /*  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const login = await util.login(username, password)

          console.log(login)
          return done(null, login)
        } catch (err) {
          return done(err)
        }
      },
    ),
  ) */

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username })
        .then((user) => {
          if (!user) return done(null, false, { message: 'Incorrect username' })
          if (!user.validatePassword(password))
            return done(null, false, { message: 'Incorrect password' })
          return done(null, { id: user.id, authType: 'local' })
        })
        .catch(done)
    }),
  )

  /* passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_LOGIN_ID,
        clientSecret: process.env.FACEBOOK_LOGIN_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName } = profile
        try {
          const user = await util.facebookLogin(profile)
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      },
    ),
  ) */

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_LOGIN_ID,
        clientSecret: process.env.FACEBOOK_LOGIN_SECRET,
        callbackURL: 'https://localhost:3003/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name'],
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          id: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails[0].value,
          authType: 'facebook',
        }
        done(null, user)
      },
    ),
  )

  /*  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        const { id, displayName } = profile
        try {
          const user = await util.googleLogin(profile)
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      },
    ),
  ) */

  passport.use(
    new GoogleStrategy(
      {
        clientID: 'YOUR_GOOGLE_CLIENT_ID',
        clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
        callbackURL: '/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          authType: 'google',
        }
        done(null, user)
      },
    ),
  )

  return passport
}
