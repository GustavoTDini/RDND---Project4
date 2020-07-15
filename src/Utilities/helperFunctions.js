import {_getDecks, _getTypes } from '../Utilities/API/fakeAPI'

export function getInitialData () {
  return Promise.all([
    _getDecks(),
    _getTypes(),
  ]).then(([decks, types]) => ({
    decks,
    types,
  }))
}

export function createDeckList (JsonDeckList) {
  console.log('Json: ' + JsonDeckList)
  let deckList = []
  for ( let deck in JsonDeckList){
    deckList = deckList.concat(JsonDeckList[deck])
  }
  return deckList
}