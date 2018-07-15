class MockApp {
  constructor () {
    this._config = {}
  }
  use (mw) {}
  get (key) {
    return this._config[key]
  }
  set (key, value) {
    this._config[key] = value
  }
}

module.exports = MockApp
