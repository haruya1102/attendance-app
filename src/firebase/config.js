// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClW61o1TmUglENa-ZhX2GMt0ax51F7uPg",
  authDomain: "attendance-app-77f1c.firebaseapp.com",
  projectId: "attendance-app-77f1c",
  storageBucket: "attendance-app-77f1c.appspot.com",
  messagingSenderId: "812221160186",
  appId: "1:812221160186:web:c547c49b1c19cce7fb0743",
  measurementId: "G-FLH86PQPHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };