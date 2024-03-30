// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl_UzH5-be3rcmQVdrF_dQoFunN76V-Y8",
  authDomain: "sandbag-d8d8a.firebaseapp.com",
  projectId: "sandbag-d8d8a",
  storageBucket: "sandbag-d8d8a.appspot.com",
  messagingSenderId: "731392807058",
  appId: "1:731392807058:web:03ad6fe0d15ad29271d64b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth , storage };