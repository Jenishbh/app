// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsu9XE6VRfzIpgeRGv3pHQqcSow-F6uAc",
  authDomain: "customerapp-18dc5.firebaseapp.com",
  databaseURL: "https://customerapp-18dc5-default-rtdb.firebaseio.com",
  projectId: "customerapp-18dc5",
  storageBucket: "customerapp-18dc5.appspot.com",
  messagingSenderId: "12015236055",
  appId: "1:12015236055:web:85754317a78df53f655192",
  measurementId: "G-BLWSBVJWX4"
};

// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const auth = firebase.auth();
  const db = firebase.firestore();
  const database = firebase.database();

export { auth,db,database };
//const analytics = getAnalytics(app);

