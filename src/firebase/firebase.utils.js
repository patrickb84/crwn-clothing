import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDCBeUWfirfROiYEwKUqGXOYP_dj0QYV9A',
	authDomain: 'crwn-db-e970b.firebaseapp.com',
	databaseURL: 'https://crwn-db-e970b.firebaseio.com',
	projectId: 'crwn-db-e970b',
	storageBucket: '',
	messagingSenderId: '833954352325',
	appId: '1:833954352325:web:47223c8b3263d806'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	// * References
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	// const collectionRef = firestore.collection('users');

	// * Snapshots
	const snapShot = await userRef.get();
	// const collectionSnapshot = await collectionRef.get();
	// console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc(); // * Generate a new ID for me
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
	const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
		const { title, items } = docSnapshot.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: docSnapshot.id,
			title,
			items
		};
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
