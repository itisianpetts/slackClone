import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: 'slack-clone-ian-petts.firebaseapp.com',
  projectId: 'slack-clone-ian-petts',
  storageBucket: 'slack-clone-ian-petts.appspot.com',
  messagingSenderId: '494856515363',
  appId: '1:494856515363:web:0b8e0be553e35658a12696',
  measurementId: 'G-NVX14S5Q1B',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
