import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCln-LOhLxDzvebRlWvVMCxyOBrQmAB7yw",
  authDomain: "petsolutionsinventory.firebaseapp.com",
  projectId: "petsolutionsinventory",
  storageBucket: "petsolutionsinventory.appspot.com",
  messagingSenderId: "234344734401",
  appId: "1:234344734401:android:e5cd8e9f2bfec87c3ebe40"
};

const app = initializeApp(firebaseConfig);

// 🔥 Auth for web only
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};

// Optional check session or logout
export const checkUserSession = (router) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router('../components/login.jsx');
    } else {
      router('/login');
    }
  });
};

export const logout = async (router) => {
  try {
    await signOut(auth);
    router('../components/login.jsx');
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};
