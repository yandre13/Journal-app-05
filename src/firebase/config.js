import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyCOxW-PEg6OLIOU3aeHgvBwgZTgyxqWtwA',
	authDomain: 'journal-app-87af5.firebaseapp.com',
	databaseURL: 'https://journal-app-87af5.firebaseio.com',
	projectId: 'journal-app-87af5',
	storageBucket: 'journal-app-87af5.appspot.com',
	messagingSenderId: '402411494306',
	appId: '1:402411494306:web:6516e010f66622826cf0fb',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const authProvider = new firebase.auth.GoogleAuthProvider()

export { db, authProvider, firebase }
