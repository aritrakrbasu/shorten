import firebase from 'firebase';
import 'firebase/firestore'

	const config = {
    apiKey: "AIzaSyDUl5oJC6k3rUPIzT6Ltr2FYelx1ftfiOg",
    authDomain: "testshorten-bf5f4.firebaseapp.com",
    databaseURL: "https://testshorten-bf5f4.firebaseio.com",
    projectId: "testshorten-bf5f4",
    storageBucket: "testshorten-bf5f4.appspot.com",
    messagingSenderId: "113968819419",
    appId: "1:113968819419:web:d5a1dc54c0b4396584f0fe",
    measurementId: "G-JRNFWZR7F5"
      };
    export const fire=firebase.initializeApp(config);
    export const db=firebase.firestore();
    export const domain = 'http://localhost:3000';
    export default firebase; 