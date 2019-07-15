import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDCBeUWfirfROiYEwKUqGXOYP_dj0QYV9A",
  authDomain: "crwn-db-e970b.firebaseapp.com",
  databaseURL: "https://crwn-db-e970b.firebaseio.com",
  projectId: "crwn-db-e970b",
  storageBucket: "",
  messagingSenderId: "833954352325",
  appId: "1:833954352325:web:47223c8b3263d806"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;