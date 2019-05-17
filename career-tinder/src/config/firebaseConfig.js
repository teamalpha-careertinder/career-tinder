import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyBevDnFW_8QV7ydcIClGeZfIrZJh3J_fWI",
  authDomain: "career-tinder.firebaseapp.com",
  databaseURL: "https://career-tinder.firebaseio.com",
  projectId: "career-tinder",
  storageBucket: "career-tinder.appspot.com",
  messagingSenderId: "430287319970",
  appId: "1:430287319970:web:630a3cd4111782b0"
};
firebase.initializeApp(config);
firebase.firestore().settings({});

export default firebase;
