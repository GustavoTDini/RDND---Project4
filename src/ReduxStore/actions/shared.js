import { receiveTypes } from '../actions/types'
import { receiveDecks } from '../actions/decks'
import { getInitialData } from '../../Utilities/helperFunctions'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ decks, types }) => {
        dispatch(receiveDecks(decks))
        dispatch(receiveTypes(types))
      })
  }
}