// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "tread-clone.firebaseapp.com",
  projectId: "tread-clone",
  storageBucket: "tread-clone.appspot.com",
  messagingSenderId: "738141465933",
  appId: "1:738141465933:web:fe1ccc08edd9b73d6d9b04"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);