import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC0cHbN-y4pWjfekTuoGlt1KKlMxYFUS6c",
  authDomain: "quiz-app-cf8b3.firebaseapp.com",
  databaseURL: "https://quiz-app-cf8b3.firebaseio.com",
  projectId: "quiz-app-cf8b3",
  storageBucket: "",
  messagingSenderId: "658283759288"
};

if (!firebase.apps.length){
  firebase.initializeApp(config);
}

/* Constants */
const auth = firebase.auth();
const database = firebase.database();

const providerData = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider()
}

export {
  auth,
  database,
  firebase,
  providerData
}
