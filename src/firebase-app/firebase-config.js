import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHIT5hHFyubff2itoQCViJig4mSKUj06g",
  authDomain: "monkey-blogging-cea17.firebaseapp.com",
  projectId: "monkey-blogging-cea17",
  storageBucket: "monkey-blogging-cea17.appspot.com",
  messagingSenderId: "132695591481",
  appId: "1:132695591481:web:a85c76a6d63636a62d9be8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
