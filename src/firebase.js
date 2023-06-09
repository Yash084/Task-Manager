import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCNICdQHdeeoDVYpqHMZOqiWk66-d66L_g",
    authDomain: "resoluteaiassignment.firebaseapp.com",
    projectId: "resoluteaiassignment",
    storageBucket: "resoluteaiassignment.appspot.com",
    messagingSenderId: "888772856843",
    appId: "1:888772856843:web:54478d22b7770743304b0e",
    measurementId: "G-H0KCPP0BH4"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()
const timestamp = serverTimestamp();

export { db, auth, app, timestamp}
