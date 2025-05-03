// Firebase connections
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { SignupForm } from "@/components/sections/Signup";
import bcrypt from "bcryptjs";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "farmer-connect-75b72.firebaseapp.com",
  projectId: "farmer-connect-75b72",
  storageBucket: "farmer-connect-75b72.firebasestorage.app",
  messagingSenderId: "764371013229",
  appId: "1:764371013229:web:54749ab9295c0481e9f964",
  measurementId: "G-W4PDL8TQ54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


export const addUser = async (user: SignupForm) => {
  try {
    // hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    const docRef = await addDoc(collection(db, "users"), {
      email: user.email,
      name: user.name,
      role: user.role,
      password: hash,
    });
    console.log("Document written with ID: ", docRef.id);
    return {
      success: true,
      message: "User added successfully",
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      success: false,
      message: `Error adding document: ${e}`,
    }
  }
}


export const loginUser = async (userId: string) => {
  try {
    const docRef = await getDoc(doc(db, "users", userId));
    if (docRef.exists()) {
      console.log("Document data:", docRef.data());
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
}

