const passport = require('passport')
const LocalStrategy = require('passport-local')
const util = require('../Utils/authUtils')
const {
  findUserByFacebookId,
  findUserByEmail,
  findUserByGoogleId,
} = require('../Utils/userUtils')
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
    const { id, type, email } = data

    if (type === 'google') {
      // Fetch the user from the database based on Google ID
      findUserByGoogleId(id)
        .then((user) => done(null, user))
        .catch(done)
    } else if (type === 'facebook') {
      // Fetch the user from the database based on Facebook ID
      findUserByFacebookId(id).then((user) => done(null, user))
      console.log('session').catch(done)
    } else if (type === 'local') {
      // Fetch the user from the database based on Local ID
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
