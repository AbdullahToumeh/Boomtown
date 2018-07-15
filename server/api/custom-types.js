const { GraphQLScalarType } = require('graphql')

const { Kind } = require('graphql/language')

const UploadScalar = new GraphQLScalarType({
  name: 'Upload',
  description:
    'The `Upload` scalar type represents a file upload promise that resolves ' +
    'an object containing `stream`, `filename`, `mimetype` and `encoding`.',
  parseValue: value => value,
  parseLiteral() {
    throw new Error('Upload scalar literal unsupported')
  },
  serialize() {
    throw new Error('Upload scalar serialization unsupported')
  }
})

/**
 *  @TODO: Custom Types
 *  GraphQL includes the following built-in Scalar Types: https://graphql.org/learn/schema/#scalar-types
 *
 *  The purpose of the Scalar type is to validate the information being sent and received
 *  from our GraphQL API.
 *
 *  Apollo allows us to define our own custom types. We'll create our own custom type to handle the value from the 'created' field
 *  on the Item: https://www.apollographql.com/docs/graphql-tools/scalars.html
 *
 *  Once you've defined your custom DATE type, don't forget to add it to your schema.
 */

// @TOOD: Refactor this into a custom DATE scalar type using new GraphQLScalarType()
const DateScalar = undefined
// -------------------------------

module.exports = {
  UploadScalar,
  DateScalar
}
