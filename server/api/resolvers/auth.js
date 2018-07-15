const { AuthenticationError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function setCookie({ tokenName, token, res }) {
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for attaching a cookie to the HTTP
   *  response. 'apollo-server-express' handles returning the response to the client.
   *  We added the 'req' object to the resolver context so we can use it to atttach the cookie.
   *  The 'req' object comes from express.
   *
   *  A secure cookie that can be used to store a user's session data has the following properties:
   *  1) It can't be accessed from JavaScript
   *  2) It will only be sent via https (but we'll have to disable this in development using NODE_ENV)
   *  3) A boomtown cookie should oly be valid for 2 hours.
   */
  // Refactor this method with the correct configuration values.
  res.cookie(tokenName, token, {
    // @TODO: Supply the correct configuration values for our cookie here
  })
  // -------------------------------
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user // Omit the password from the token
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for generating the JWT token.
   *  Here, we'll be taking a JSON object representing the user (the 'J' in JWT)
   *  and cryptographically 'signing' it using our app's 'secret'.
   *  The result is a cryptographic hash representing out JSON user
   *  which can be decoded using the app secret to retrieve the stateless session.
   */
  // Refactor this return statement to return the cryptographic hash (the Token)
  return ''
  // -------------------------------
}

module.exports = function(app) {
  return {
    async signup(parent, args, context) {
      try {
        /**
         * @TODO: Authentication - Server
         *
         * Storing passwords in your project's database requires some basic security
         * precautions. If someone gains access to your database, and passwords
         * are stored in 'clear-text' your users accounts immediately compromised.
         *
         * The solution is to create a cryptographic hash of the password provided,
         * and store that instead. The password can be decoded using the original password.
         */
        // @TODO: Use bcrypt to generate a cryptographic hash to conceal the user's password before storing it.
        const hashedPassword = ''
        // -------------------------------

        const user = await context.pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        })

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        })

        return {
          id: user.id
        }
      } catch (e) {
        throw new AuthenticationError(e)
      }
    },

    async login(parent, args, context) {
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        )

        /**
         *  @TODO: Authentication - Server
         *
         *  To verify the user has provided the correct password, we'll use the provided password
         *  they submitted from the login form to decrypt the 'hashed' version stored in out database.
         */
        // Use bcrypt to compare the provided password to 'hashed' password stored in your database.
        const valid = false
        // -------------------------------
        if (!valid || !user) throw 'User was not found.'

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        })

        return {
          id: user.id
        }
      } catch (e) {
        throw new AuthenticationError(e)
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'))
      return true
    }
  }
}
