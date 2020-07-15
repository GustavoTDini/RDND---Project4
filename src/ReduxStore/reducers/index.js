import { combineReducers } from 'redux'
import types from './types'
import decks from './decks'

export default combineReducers({
  types,
  decks,
})