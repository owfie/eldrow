import firebase, {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBSAE_APP_ID,
  measurementId: process.env.FIREBSAE_MEASUREMENT_ID
}

if (firebase.getApps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase;