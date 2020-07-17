import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/auth'
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB4qWwZZeNtuh5BcW6h5B0jRBvUlm237W0",
  authDomain: "udacitynativecards.firebaseapp.com",
  databaseURL: "https://udacitynativecards.firebaseio.com",
  projectId: "udacitynativecards",
  storageBucket: "udacitynativecards.appspot.com",
  messagingSenderId: "561397988339",
  appId: "1:561397988339:web:e58b4177bbcd77805ef086",
  measurementId: "G-244R9FTES7"
};

try {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
} catch (err) {
  console.log(err)
}

export default firebase;
