import {RECEIVE_TYPES} from '../actionsTypes'

export function receiveTypes (types){
  return{
    type: RECEIVE_TYPES,
    types,
  }
}