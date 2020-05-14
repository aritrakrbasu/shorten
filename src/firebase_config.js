import firebase from 'firebase';
import 'firebase/firestore'
//put all your firbase details below
	const config = {
    apiKey: "AIzaSyBOhO4u149Xg0_RFSdLKO6XnndS5yUYttk",
    authDomain: "shorten2020.firebaseapp.com",
    databaseURL: "https://shorten2020.firebaseio.com",
    projectId: "shorten2020",
    storageBucket: "shorten2020.appspot.com",
    messagingSenderId: "430185808038",
    appId: "1:430185808038:web:c4c485054e7992e52b3467",
    measurementId: "G-9NFR8RHXDP"
      };
    export const fire=firebase.initializeApp(config);
    export const db=firebase.firestore();
    export const domain = 'http://localhost:3000'; //put your domain here 
    export default firebase; 