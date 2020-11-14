import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBsnMlW5Tk6ggyhl5UJDZAhyFLb9JEWOqc",
    authDomain: "slack-clone-61aef.firebaseapp.com",
    databaseURL: "https://slack-clone-61aef.firebaseio.com",
    projectId: "slack-clone-61aef",
    storageBucket: "slack-clone-61aef.appspot.com",
    messagingSenderId: "318628023495",
    appId: "1:318628023495:web:2baeb608b0c524ca69c2e2",
    measurementId: "G-PBRCGK2GGT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db;
