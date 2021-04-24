import firebase from "firebase/app"
import "firebase/firestore"

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyCP3kQj5IN9ipp5i8kylb3Jpdt-HjPTjP8",
    authDomain: "critter-cdf2a.firebaseapp.com",
    projectId: "critter-cdf2a",
    storageBucket: "critter-cdf2a.appspot.com",
    messagingSenderId: "704445717918",
    appId: "1:704445717918:web:e52e9e01ea9a7658a20a8f"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db