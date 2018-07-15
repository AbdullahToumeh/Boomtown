const { ApolloError } = require('apollo-server')
const MockApp = require('../../../../__mocks__/mock-app')
const MockUser = require('../../../../__mocks__/db/User')
const resolvers = require('../../../../api/resolvers')

const user = async () => {
  const app = new MockApp()
  const parent = {}
  const args = {}
  let ctx = {
    pgResource: {
      getUserById () {
        return MockUser
      }
    }
  }

  let output = await resolvers(app).Query.user(parent, args, ctx)
  expect(output).toEqual(MockUser)

  ctx = {
    pgResource: {
      getUserById () {
        throw 'Error'
      }
    }
  }
  try {
    output = await resolvers(app).Query.user(parent, args, ctx)
  } catch (e) {
    expect(e).toEqual(new ApolloError('Error'))
  }
}

module.exports = {
  user
}
