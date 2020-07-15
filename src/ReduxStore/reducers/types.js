import { RECEIVE_TYPES } from '../actionsTypes'

export default function types (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TYPES :
      console.log("Types State: " + state)
      console.log("Types Action: " + action)
      return {
        ...state,
        ...action.types
      }
      default :
      return state
  }
}