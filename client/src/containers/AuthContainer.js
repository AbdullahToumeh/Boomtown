import { adopt } from 'react-adopt'
import { Mutation } from 'react-apollo'
import React from 'react'

import client from '../apollo'

import {
  VIEWER_QUERY,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  SIGNUP_MUTATION
} from '../ApolloClient/queries'

const signup = ({ render }) => {
  /**
   * @TODO: Use Apollo's <Mutation /> component to use the signup mutation.
   */
  return undefined
}

const login = ({ render }) => {
  /**
   * @TODO: Use Apollo's <Mutation /> component to use the login mutation.
   */
  return undefined
}

const logout = ({ render }) => {
  /**
   * @TODO: Use Apollo's <Mutation /> component to use the logout mutation.
   */
  return undefined
}

const AuthContainer = adopt({
  // @TODO: Uncomment each line as you write the corresponding query.
  // signup,
  // login,
  // logout
  // -------------------------------
})

export default AuthContainer
