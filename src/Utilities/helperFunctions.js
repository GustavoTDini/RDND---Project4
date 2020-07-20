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

export function createList (JsonDeckList) {
  let list = []
  for ( let item in JsonDeckList){
    list = list.concat(JsonDeckList[item])
  }
  return list
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

export function formatNewCard(question, answer, questionImage, answerImage){
  return {
    question: question,
    answer: answer,
    questionImage: questionImage,
    answerImage: answerImage
  }
}