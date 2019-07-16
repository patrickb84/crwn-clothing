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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;