import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'

// @TODO: Import your reducers

const middleware = []

const store = createStore(
  combineReducers(/* @TODO: Combine your reducers */),
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
