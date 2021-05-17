import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqb_MFvoNJkplqwfvWHYxkXhTQac1Ln6I",
    authDomain: "m-tova.firebaseapp.com",
    databaseURL: "https://m-tova-default-rtdb.firebaseio.com",
    projectId: "m-tova",
    storageBucket: "m-tova.appspot.com",
    messagingSenderId: "377358404273",
    appId: "1:377358404273:web:43b86967e7e27af270b090",
    measurementId: "G-EX7T3Y3YKB"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
export const db = firebase.firestore();
export const auth = firebase.auth()
export const storage = firebase.storage();