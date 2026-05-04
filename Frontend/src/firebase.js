import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmM0pDXm6Q9ndIBQjta_kkEqR8IGOQ9E4",
  authDomain: "bookexchangeapp-2bd2f.firebaseapp.com",
  projectId: "bookexchangeapp-2bd2f",
  storageBucket: "bookexchangeapp-2bd2f.firebasestorage.app",
  messagingSenderId: "397974450755",
  appId: "1:397974450755:web:756ec6106ba15653e65af6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();