import {RECEIVE_DECKS} from '../actionsTypes'

export function receiveDecks (decks){
  return{
    type: RECEIVE_DECKS,
    decks,
  }
}