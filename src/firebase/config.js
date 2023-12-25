import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyDl76D8rcMXHgs87mgN181jrxTVNeb57L8",
  authDomain: "journal-app-cb1f3.firebaseapp.com",
  projectId: "journal-app-cb1f3",
  storageBucket: "journal-app-cb1f3.appspot.com",
  messagingSenderId: "94280384476",
  appId: "1:94280384476:web:7a58005ba3f0d4b06d5919",
  measurementId: "G-F9JE49N4EP"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);