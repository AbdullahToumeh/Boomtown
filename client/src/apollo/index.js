import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

const httpWithUploadsLink = createUploadLink({
  includeExtensions: true,
  // @TODO: If `process.env.NODE_ENV !== 'production'`, then use localhost's GraphQL endpoint
  uri: 'http://localhost:8080/graphql',
  // -------------------------------
  credentials: process.env.NODE_ENV === 'production' ? 'same-origin' : 'include'
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      // Log better error messages to console
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    /**
     * @TODO: Set your httpWithUploads link as the next item in this array.
     *
     * Don't forget to add to add a comma after the first array item above!
     */
    httpWithUploadsLink
  ]),
  cache: new InMemoryCache() // Pull data from client-side cache, if available
})

export default client
