const session = require('express-session')
const { SESSION_SECRET } = require('../config')
const { StrictMode } = require('react')

//express setup
module.exports = (app) => {
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  )

  return app
}
