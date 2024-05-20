import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzuCyKYhgtu0pcx-kbXbSQPIHeQcdvZnQ",
  authDomain: "twitter-604a6.firebaseapp.com",
  projectId: "twitter-604a6",
  storageBucket: "twitter-604a6.appspot.com",
  messagingSenderId: "144805135956",
  appId: "1:144805135956:web:6dc1fafc5a0baa6789cfc1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);