const { ApolloError } = require('apollo-server')
const MockApp = require('../../../../__mocks__/mock-app')
const MockTag = require('../../../../__mocks__/db/Tag')
const resolvers = require('../../../../api/resolvers')

const tags = async () => {
  const app = new MockApp()
  const parent = {}
  const args = {}
  let ctx = {
    pgResource: {
      getTags () {
        return [MockTag]
      }
    }
  }

  let output = await resolvers(app).Query.tags(parent, args, ctx)
  expect(output).toEqual([MockTag])

  ctx = {
    pgResource: {
      getTags () {
        throw 'Error'
      }
    }
  }

  try {
    output = await resolvers(app).Query.tags(parent, args, ctx)
  } catch (e) {
    expect(e).toEqual(new ApolloError('Error'))
  }
}

module.exports = {
  tags
}
