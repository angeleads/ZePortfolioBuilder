import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCtFUiFS00bgg72Xmu9iaubswz68Zc8kBs",
  authDomain: "ze-portfolio-builder.firebaseapp.com",
  projectId: "ze-portfolio-builder",
  storageBucket: "ze-portfolio-builder.firebasestorage.app",
  messagingSenderId: "195559204957",
  appId: "1:195559204957:web:023822a97f78d45649c5b4",
  measurementId: "G-9DE01FCSMK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);

export { app, db, auth, storage };