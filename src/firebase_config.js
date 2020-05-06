import firebase from 'firebase';
import 'firebase/firestore'
//put all your firbase details below
	const config = {
    apiKey: "#####",
    authDomain: "#####",
    databaseURL: "#####",
    projectId:"#####",
    storageBucket: "#####",
    messagingSenderId: "#####",
    appId: "#####",
    measurementId: "#####"
      };
    export const fire=firebase.initializeApp(config);
    export const db=firebase.firestore();
    export const domain = 'http://localhost:3000'; //put your domain here 
    export default firebase; 