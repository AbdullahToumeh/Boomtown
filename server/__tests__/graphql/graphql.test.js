require('../../__mocks__/modules')

var graphql = require('graphql')

const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer
} = require('graphql-tools')

const path = require('path')
const glob = require('glob')

const typeDefs = require('../../api/schema')
const expectedTypeDefs = require('./resolvers/expected-schema')
const mockFunctions = require('../../__mocks__/mock-schema')

describe('GraphQL Schema', () => {
  const schema = makeExecutableSchema({ typeDefs })
  const expectedSchema = makeExecutableSchema({ typeDefs: expectedTypeDefs })

  addMockFunctionsToSchema({
    schema: schema,
    mocks: mockFunctions
  })

  describe('Schema', () => {
    test('Schema type definitions are valid.', async () => {
      expect(async () => {
        const MockServer = mockServer(typeDefs)
        await MockServer.query(`{ __schema { types { name } } }`)
      }).not.toThrow()
    })

    describe('Queries', () => {
      const expectedQueries = Object.keys(
        expectedSchema.getQueryType().getFields()
      )
      const queries = Object.keys(schema.getQueryType().getFields())
      expectedQueries.forEach(q => {
        test(q, () => {
          expect(queries).toContain(q)
        })
      })
    })

    describe('Mutations', () => {
      const expectedMutations = Object.keys(
        expectedSchema.getMutationType().getFields()
      )
      const mutations = Object.keys(schema.getMutationType().getFields())
      expectedMutations.forEach(m => {
        test(m, () => {
          expect(mutations).toContain(m)
        })
      })
    })

    describe('Types', () => {
      describe('Item', () => {
        test('The Item type should be defined', () => {
          expect(schema.getType('Item')).toBeDefined()
        })

        const item = schema.getType('Item')
        const itemFields = item.getFields()

        const expectedItem = expectedSchema.getType('Item')
        const expectedItemFields = expectedItem.getFields()

        const expectedFields = new Map([
          ['id', new graphql.GraphQLNonNull(graphql.GraphQLID)],
          ['title', new graphql.GraphQLNonNull(graphql.GraphQLString)],
          ['imageurl', graphql.GraphQLString],
          ['description', new graphql.GraphQLNonNull(graphql.GraphQLString)],
          ['itemowner', expectedItemFields.itemowner.type],
          ['created', expectedItemFields.created.type],
          ['tags', expectedItemFields.tags.type],
          ['borrower', expectedItemFields.borrower.type]
        ])

        describe('fields & types:', () => {
          for (let [field, type] of expectedFields) {
            test(`${field}: ${type}`, () => {
              expect(itemFields[field].type.toString()).toEqual(type.toString())
            })
          }
        })
      })
      describe('User', () => {
        test('The User type should be defined', () => {
          expect(schema.getType('User')).toBeDefined()
        })

        const user = schema.getType('User')
        const userFields = user.getFields()

        const expectedUser = expectedSchema.getType('User')
        const expectedUserFields = expectedUser.getFields()

        const expectedFields = new Map([
          ['id', new graphql.GraphQLNonNull(graphql.GraphQLID)],
          ['email', new graphql.GraphQLNonNull(graphql.GraphQLString)],
          ['fullname', new graphql.GraphQLNonNull(graphql.GraphQLString)],
          ['bio', graphql.GraphQLString],
          ['items', expectedUserFields.items.type],
          ['borrowed', expectedUserFields.borrowed.type]
        ])

        describe('fields & types:', () => {
          for (let [field, type] of expectedFields) {
            test(`${field}: ${type}`, () => {
              expect(userFields[field].type.toString()).toEqual(type.toString())
            })
          }
        })
      })
      describe('Tag', () => {
        test('The Tag type should be defined', () => {
          expect(schema.getType('Tag')).toBeDefined()
        })

        const tag = schema.getType('Tag')
        const tagFields = tag.getFields()

        const expectedTag = expectedSchema.getType('Tag')
        const expectedTagFields = expectedTag.getFields()

        const expectedFields = new Map([
          ['id', new graphql.GraphQLNonNull(graphql.GraphQLID)],
          ['title', new graphql.GraphQLNonNull(graphql.GraphQLString)]
        ])

        describe('fields & types:', () => {
          for (let [field, type] of expectedFields) {
            test(`${field}: ${type}`, () => {
              expect(tagFields[field].type.toString()).toEqual(type.toString())
            })
          }
        })
      })
    })
  })

  describe('Resolvers', () => {
    describe('Query resolvers:', () => {
      const files = glob.sync(
        path.resolve(__dirname, '../resolvers/Query/*.js')
      )

      files.forEach(file => {
        describe('Query resolvers:', () => {
          const resolvers = require(file)
          Object.entries(resolvers).forEach(([name, fn]) => {
            it(name, () => Promise.resolve(fn()))
          })
        })
      })
    })
  })
})
