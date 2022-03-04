import {initializeApp, getApp, FirebaseOptions} from "firebase/app"
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBSAE_APP_ID,
  measurementId: process.env.FIREBSAE_MEASUREMENT_ID
}

const createFirebaseApp = (config: FirebaseOptions) => {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

const app = createFirebaseApp(firebaseConfig)
const db = getFirestore(app)
// TODO Check environment
connectFirestoreEmulator(db, 'localhost', 8080)

enableIndexedDbPersistence(db)
.catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
    } else if (err.code == 'unimplemented') {
      console.log('The current browser does not support all of the features required to enable persistence')
    }
})

export default app
export { db }