import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB2K6AWQsMpUMat36Advx0Qvu5BpC_7ImA',
  authDomain: 'submissions-manager-e2a1d.firebaseapp.com',
  projectId: 'submissions-manager-e2a1d',
  storageBucket: 'submissions-manager-e2a1d.appspot.com',
  messagingSenderId: '961921492466',
  appId: '1:961921492466:web:d67be3c8c0021f728f376b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
