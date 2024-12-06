const express = require('express')
require('dotenv').config()
const app = express()
const { PORT } = require('./config.js')
const loaders = require('./Loaders')
const https = require('https');
const fs = require('fs');
const http = require('http')
const path = require('path');

async function startServer() {
  loaders(app)

  const sslOptions = {
    key: fs.readFileSync(path.join( '..', 'cert.key')),
    cert: fs.readFileSync(path.join( '..','cert.crt')),
  };

  http.createServer(app).listen(3002, () => {
    console.log('HTTP server running on http://localhost:3002');
  });
  
  https.createServer(sslOptions, app).listen(3003, () => {
    console.log('HTTPS server running on https://localhost:3003');
  });

  /* app.listen(PORT, () => {
    console.log(`Fresh Ink listening on port ${PORT}`)
  }) */
}

startServer()
