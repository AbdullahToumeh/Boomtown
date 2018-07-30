import { Query } from 'react-apollo'
import React, { Fragment } from 'react'

import { VIEWER_QUERY } from '../apollo/queries'

export const ViewerContext = React.createContext()

export const ViewerProvider = ({ children }) => (
      <Query query={VIEWER_QUERY}>
      {({data: {viewer}={}, loading, error}) => {
        return (
          <ViewerContext.Provider value={{ viewer, loading, error }}>
          {children}
          </ViewerContext.Provider>
        )
      }}
  </Query>
)