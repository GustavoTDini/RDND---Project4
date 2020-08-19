import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export function createList(JsonDeckList) {
  let list = []
  for (let item in JsonDeckList) {
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
    return (null)
  })
}

export function formatNewCard(id, question, answer, questionImage, answerImage) {
  return {
    id: id,
    question: question,
    answer: answer,
    questionImage: questionImage,
    answerImage: answerImage
  }
}

export function formatNewDeck(id, author, title, description, topic, image, authorId) {
  return {
    id: id,
    author: author,
    authorId: authorId,
    title: title,
    description: description,
    topic: topic,
    show_image: image,
    views_number: 0,
    date_created: Date.now(),
    cards:{}
  }
}

// format the time for human readability - set to en-US 
export function formatTime(timestamp) {
  const date = new Date(timestamp)
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const dateString = date.toLocaleString('en-US', options)
  return dateString
}

const getFile = async (uri) => {
  const result = await fetch(uri);
  return result.blob();
}

export const saveImageToStorage = async (ref, imageUri) => {
  file = await getFile(imageUri)
  await ref
    .put(file)
    .then((snapshot) => {
      console.log(`${ref} has been successfully uploaded.`);
    })
    .catch((e) => console.log('uploading image error => ', e));
}

export async function getImageFromRoll() {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      return (result.uri)
    }
  } catch (E) {
    console.log(E);
  }
}

export async function getImageFromCamera() {
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      return (result.uri)
    }
  } catch (E) {
    console.log(E);
  }
}

export async function getPermissionAsync() {
  if (Constants.platform.ios) {
    const { colectionStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (colectionStatus !== 'granted') {
      alert('Sorry, we need cameraroll permissions to make this work!');
    }
  }
};