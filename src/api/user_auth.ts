// Firebase connections
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {  getDocs, getFirestore, query, where } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { SignupForm } from "@/components/sections/Signup";
import bcrypt from "bcryptjs";
import { LoginFormData } from "@/components/sections/Login";

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
    // Check if user already exists
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", `${user.email}`));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log("User already exists");
      return {
        success: false,
        message: "User already exists",
      }
    }
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


export const loginUser = async (loginDetails: LoginFormData) => {
  try {
    const userRef = collection(db, "users");
    // const hashedPassw = bcrypt.compareSync(loginDetails.password, "");
    const q = query(userRef, where("email", "==", `${loginDetails.email}`));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    const docSnap = querySnapshot.docs[0];
    if (docSnap) {
      const data = docSnap.data();
      console.log("Document data:", data);
      // Check if password matches
      const isPasswordValid = await bcrypt.compare(loginDetails.password, data.password);
      if (!isPasswordValid) {
        console.log("Invalid password");
        return {
          success: false,
          message: "Invalid password",
        }
      }
      // If password is valid, return user data
      console.log("User logged in successfully");
      return {
        success: true,
        message: "User logged in successfully",
        data: docSnap.data(),
      }
    }
    else {
      console.log("No such document!");
      return {
        success: false,
        message: "No such document!",
      }
    }

    
  } catch (e) {
    console.error("Error getting document: ", e);
    return {
      success: false,
      message: `Error getting document: ${e}`,
    }
  }
}

