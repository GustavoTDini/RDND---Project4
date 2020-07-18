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
  let deckList = []
  for ( let deck in JsonDeckList){
    deckList = deckList.concat(JsonDeckList[deck])
  }
  return deckList
}

export async function getAndLoadHttpUrl(firebase, ref) {
  const iconreference = firebase.storage().ref(ref);
  iconreference.getDownloadURL().then(url => {
    return (url)
  }).catch(error => {
    console.log(error)
    return(null)
  })
}