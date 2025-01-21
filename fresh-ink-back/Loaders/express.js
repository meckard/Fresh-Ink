const session = require('express-session')
const { SESSION_SECRET } = require('../config')
const { StrictMode } = require('react')
const cors = require('cors')
const bodyParser = require('body-parser')

//express setup
module.exports = (app) => {
  app.use(cors({
    origin: 'https://localhost:3000', // Frontend origin
    credentials: true,
  }));
  
  // Debugging to check middleware
  app.use((req, res, next) => {
    console.log('CORS Middleware Applied');
    next();
  });
  
  // Middleware for parsing JSON and URL-encoded data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Session middleware
  app.use(
    session({
      secret: 'your-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  return app
}
