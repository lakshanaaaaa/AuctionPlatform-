// src/firebase.js

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb4e_LXealuZ0kZobj_0FZvBqVMBioOVQ",
  authDomain: "auction-platform-bf8cd.firebaseapp.com",
  projectId: "auction-platform-bf8cd",
  storageBucket: "auction-platform-bf8cd.appspot.com",
  messagingSenderId: "183381411863",
  appId: "1:183381411863:web:f7565f65362af1234bf452",
  measurementId: "G-D8LB9559YT"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export auth and provider
export { auth, googleProvider };
