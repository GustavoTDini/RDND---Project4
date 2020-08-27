import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'

const NOTIFICATION_KEY = 'UdacityNativeCards:notifications'

export function createList(JsonDeckList) {
  let list = []
  for (let item in JsonDeckList) {
    if (JsonDeckList[item] !== null) {
      list = list.concat(JsonDeckList[item])
    }
  }
  return list
}

export function createTrueFalseArray(deck) {
  let newArray = []
  for (let i = 0; i < deck.length; i++) {
    newArray.push(false)
  }
  console.log(JSON.stringify(newArray))
  return newArray
}

export function displayScoreMessage(score) {
  let message = ''
  if (score >= 100){
    message = 'Congratulations, you answered all correct!!'
  } else if (score >= 80 && score < 100) {
    message = 'Great, you sure have studied for this topic!'
  } else if (score >= 50 && score < 80) {
    message = 'Good, but you need to study a litte more!'
  } else if (score >= 30 && score < 50) {
    message = 'Not Good enought, try harder next time!'
  } else if (score > 0 && score < 30) {
    message = 'You´d better spend less time on social media!'
  } else {
    message = 'Not even a single one correct! You´d better start your studies!'
  }
  return message  
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

export function formatNewUser(name, email) {
  return {
    name: name,
    email: email,
    decks: {}
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
    cards: {}
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
  // Camera roll Permission 
  if (Platform.OS === 'ios') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
  // Camera Permission
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status
};

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Start a Deck!!! 🎴',
    body: "You haven´t tested you knowledge today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(21)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}