const MockApp = require('../../../../__mocks__/mock-app')
const MockUser = require('../../../../__mocks__/db/User')
const resolvers = require('../../../../api/resolvers')

const viewer = () => {
  const app = new MockApp()
  const parent = {}
  const args = {}
  let ctx = {
    token: true
  }

  let output = resolvers(app).Query.viewer(parent, args, ctx)
  expect(output).toEqual(MockUser)

  ctx = {
    token: false
  }

  output = resolvers(app).Query.viewer(parent, args, ctx)
  expect(output).toEqual(null)
}

module.exports = {
  viewer
}
