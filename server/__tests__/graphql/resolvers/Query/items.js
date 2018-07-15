const { ApolloError } = require('apollo-server')
const MockApp = require('../../../../__mocks__/mock-app')
const MockItem = require('../../../../__mocks__/db/Item')
const resolvers = require('../../../../api/resolvers')

const items = async () => {
  const app = new MockApp()
  const parent = {}
  const args = {}
  let ctx = {
    pgResource: {
      getItems () {
        return [MockItem]
      }
    }
  }

  let output = await resolvers(app).Query.items(parent, args, ctx)
  expect(output).toEqual([MockItem])

  ctx = {
    pgResource: {
      getItems () {
        throw 'Error'
      }
    }
  }
  try {
    output = await resolvers(app).Query.items(parent, args, ctx)
  } catch (e) {
    expect(e).toEqual(new ApolloError('Error'))
  }
}

module.exports = {
  items
}
