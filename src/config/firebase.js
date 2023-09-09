// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBycvyV-NZl0_FuIfjBZhazYaUbrZ8AD8U",
  authDomain: "memberz-55e47.firebaseapp.com",
  projectId: "memberz-55e47",
  storageBucket: "memberz-55e47.appspot.com",
  messagingSenderId: "537985686440",
  appId: "1:537985686440:web:f52efffc52bb175d16db9d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
