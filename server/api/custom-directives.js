const { defaultFieldResolver } = require('graphql')
const { ForbiddenError } = require('apollo-server')
const { SchemaDirectiveVisitor } = require('graphql-tools')

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type)
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType)
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return
    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]
      const { resolve = defaultFieldResolver } = field
      field.resolve = async function(parent, args, context, info) {
        /**
         * @TODO: Authentication - Server
         *
         * Although this code may look complicated, you can think of this function as simply
         * a function that will be run before every resolver and given the same arguments the resolver would.
         *
         * This is very convenient for authenticating queries because we can check for the
         * authentication token using the resolver context we built!
         *
         * This will be the basic logic we'll use:
         *  1) If there is a token stored on the context object
         *  2) or the user is trying to sign-up or log-in
         *
         *  ...we can consider this request safe and proceed to the resolver function.
         *  Otherwise we must throw a 'ForbiddenError' with the apropriate message.
         *
         *  When you're finished with the logic, you'll need to apply the directive to any
         *  types in your schema that can only be viewed by authenticated users.
         *  For example:
         *
         *  Before:
         *  type User {
         *    ... fields
         *  }
         *
         *  After:
         *  type User @auth {
         *    ... fields
         *  }
         *
         * To wire up your schema directives to your resolvers you'll need to
         * add an additional option to your 'makeExecutableSchema' call in schema.js
         *
         * Here is the line you'll need to add:
         *  schemaDirectives: {
         *     auth: AuthDirective
         *  }
         *
         * The 'AuthDirective' portion of the above object is the name of the import (this class)
         * The 'auth' portion of the above object corresponds to the @auth you applied
         * to your schema types.
         *
         */

        return resolve.apply(this, [parent, args, context, info])
      }
    })
  }
}

module.exports = {
  AuthDirective
}
