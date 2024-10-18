const session = require('express-session')
const { SESSION_SECRET } = require('../config')

//express setup
module.exports = (app) => {
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  )

  return app
}
