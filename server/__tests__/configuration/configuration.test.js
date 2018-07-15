const config = require('../../config/application')
const MockApp = require('../../__mocks__/mock-app')

let app = new MockApp()

describe('Application Configuration', () => {
  describe('application.js', () => {
    beforeEach(() => {
      app._config = {}
      PORT = config(app)
    })
    test('Should return a value for PORT to be used in main.js', () => {
      expect(PORT).toBeDefined()
    })
  })

  describe('Environment variables', () => {
    beforeAll(() => {
      app._config = {}
      config(app)
    })
    test('PG_HOST', () => {
      expect(app.get('PG_HOST')).toBeDefined()
    })
    test('PG_USER', () => {
      expect(app.get('PG_USER')).toBeDefined()
    })
    test('PG_PASSWORD', () => {
      expect(app.get('PG_PASSWORD')).toBeDefined()
    })
    test('PG_DB', () => {
      expect(app.get('PG_DB')).toBeDefined()
    })
    test('JWT_SECRET', () => {
      expect(app.get('JWT_SECRET')).toBeDefined()
    })
  })

  describe('Configuration variables', () => {
    beforeAll(() => {
      app._config = {}
      config(app)
    })
    test('CORS_CONFIG', () => {
      expect(app.get('CORS_CONFIG')).toBeDefined()
    })
    test('JWT_COOKIE_NAME variable should be "bt-token"', () => {
      expect(app.get('JWT_COOKIE_NAME')).toBe('bt-token')
    })
  })
})
