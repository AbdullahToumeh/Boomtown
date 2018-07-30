import { adopt } from 'react-adopt'
import { Mutation } from 'react-apollo'
import React from 'react'

import client from '../apollo'

import {
  VIEWER_QUERY,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  SIGNUP_MUTATION
} from '../apollo/queries'

const signup = ({ render }) => (
  <Mutation
    mutation= {SIGNUP_MUTATION}
    refetchQueries= {result => [{ query: VIEWER_QUERY}]}
  >
  {(mutation, { data, error, loading}) => 
  render( {mutation, data, error, loading })
  }
  </Mutation>
)

const login = ({ render }) => (
  <Mutation
    mutation={LOGIN_MUTATION}
    refetchQueries={reset => [{ query: VIEWER_QUERY}]}
  >
    {(mutation, { data, error, loading}) =>
    render({ mutation, data, error, loading })}
  </Mutation>
)

const logout = ({ render }) => (
  <Mutation
    mutation={LOGOUT_MUTATION}
    onCompleted={() => client.resetStore()}
  >
    {(mutation, { data, error, loading}) =>
    render({ mutation, data, error, loading })}
  </Mutation>
)

const AuthContainer = adopt({
  signup,
  login,
  logout
})

export default AuthContainer
