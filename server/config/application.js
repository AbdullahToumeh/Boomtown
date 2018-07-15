const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const fallback = require('express-history-api-fallback')
const path = require('path')

module.exports = function(app) {
  const PORT = process.env.PORT || 8080
  app.set('PG_HOST', process.env.PG_HOST || 'localhost')
  app.set('PG_USER', process.env.PG_USER || 'boomtown')
  app.set('PG_PASSWORD', process.env.PG_PASSWORD || 'boomtown')
  app.set('PG_DB', process.env.PG_DB || 'boomtown')
 

  /**
   *  @TODO: Configuration Variables
   *
   *  As much as possible, configuration information should be defined in a single location, this file.
   *
   *  Server applications often need information about their external environment,
   *  such as the url and credentials of an external database, in order to run.
   *
   *  In Express, the 'app' object is a singleton, and we can use the .set method to store
   *  information on the app object, and use it elsewhere.
   *
   *  The main reason for storing configuration information, such as database credentials, in the application's
   *  'environment' instead of the source code is security. We can use the node global 'process.env' to retrieve
   *  values from our application's environment. We should also provide a fallback / default.
   *
   *  Most server applications will not run unless specific values are part of their environment.
   *  Boomtown requires the following environment variables:
   *
   *  PORT
   *  PG_HOST
   *  PG_USER
   *  PG_PASSWORD
   *  PG_DB
   *  JWT_SECRET
   *
   *  And the following non-security related information should also be set for use elsewhere:
   *
   *  JWT_COOKIE_NAME
   *  CORS_CONFIG (already set for you below)
   *
   *  Use the app.set and process.env to retrieve environment variables, and provide a fallback
   *  if any are not defined.
   *
   *  Use Express' app.set() to store additional configuration information.
   *
   *  For example: app.set('PG_HOST', process.env.PG_HOST || 'localhost')
   */

  app.use(cookieParser())

  if (process.env.NODE_ENV === 'production') {
    const root = path.resolve(__dirname, '../public')

    // Serve the static front-end from /public when deployed
    app.use(express.static(root))
    app.use(fallback('index.html', { root }))
  }

  if (process.env.NODE_ENV === 'development') {
    // Allow requests from dev server address
    const corsConfig = {
      origin: 'http://localhost:3000',
      credentials: true
    }
    app.set('CORS_CONFIG', corsConfig)

    // Allow requests from dev server address
    app.use(cors(corsConfig))
  }

  return PORT
}
