 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
 
const firebaseConfig = {
  apiKey: "AIzaSyALKzxoBjl6S7IicI1QDup-8d8eYwrkVv8",
  authDomain: "tidal-pathway-367114.firebaseapp.com",
  projectId: "tidal-pathway-367114",
  storageBucket: "tidal-pathway-367114.appspot.com",
  messagingSenderId: "753143246144",
  appId: "1:753143246144:web:9b5e4f2556816773781ea5",
  measurementId: "G-DEYN7X1PTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage};