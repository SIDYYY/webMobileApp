import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  initializeAuth, 
  getReactNativePersistence 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCln-LOhLxDzvebRlWvVMCxyOBrQmAB7yw",
  authDomain: "petsolutionsinventory.firebaseapp.com",
  projectId: "petsolutionsinventory",
  storageBucket: "petsolutionsinventory.appspot.com",
  messagingSenderId: "234344734401",
  appId: "1:234344734401:android:e5cd8e9f2bfec87c3ebe40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Add persistence
});

const db = getFirestore(app);

// Export modules
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, onAuthStateChanged };
export default { auth, db };

// Function to check user session
export const checkUserSession = (router) => {
  onAuthStateChanged(auth, async (user) => {
    const storedRole = await AsyncStorage.getItem("userRole");

    if (user && storedRole) {
      // If user is logged in and role exists, redirect to the home page
      router.replace({ pathname: "/screens/home", params: { role: storedRole } });
    } else {
      // If no user logged in or role not found, redirect to menu or login
      router.replace("/screens/splash");
    }
  });
};

// Logout function to sign out the user and navigate
export const logout = async (router) => {
  try {
    await signOut(auth); // Sign out the user from Firebase
    router.replace("/screens/splash"); // Redirect to splash screen or login screen
  } catch (error) {
    console.error("Error signing out: ", error.message); // Handle errors here
  }
};
