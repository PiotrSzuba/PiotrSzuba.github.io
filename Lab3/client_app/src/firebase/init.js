import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6ZbjJ2ugJggNMRG10Z7q-_WobXPIIENU",
    authDomain: "piwo-b775e.firebaseapp.com",
    projectId: "piwo-b775e",
    storageBucket: "piwo-b775e.appspot.com",
    messagingSenderId: "433851716793",
    appId: "1:433851716793:web:63c00a8b15f01f7afb7768",
    databaseURL: "https://piwo-b775e-default-rtdb.europe-west1.firebasedatabase.app"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);