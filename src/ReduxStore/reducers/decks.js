import { RECEIVE_DECKS } from '../actionsTypes'

export default function decks (state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS :
      console.log("Decks State: " + state)
      console.log("Decks Action: " + action)
      return {
        ...state,
        ...action.decks
      }
      default :
      return state
  }
}