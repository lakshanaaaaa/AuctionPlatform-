// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyBb4e_LXealuZ0kZobj_0FZvBqVMBioOVQ",
  authDomain: "auction-platform-bf8cd.firebaseapp.com",
  projectId: "auction-platform-bf8cd",
  storageBucket: "auction-platform-bf8cd.appspot.com",
  messagingSenderId: "183381411863",
  appId: "1:183381411863:web:f7565f65362af1234bf452",
  measurementId: "G-D8LB9559YT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Initialize storage instance

const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider }; // ✅ Export storage