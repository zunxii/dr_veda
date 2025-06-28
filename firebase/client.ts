import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdtj1b8mLKN56Lb9z6qMsl9Sj6lYSyvmY",
  authDomain: "dr-veda-5d282.firebaseapp.com",
  projectId: "dr-veda-5d282",
  storageBucket: "dr-veda-5d282.firebasestorage.app",
  messagingSenderId: "676348293770",
  appId: "1:676348293770:web:04878656cc8c271ef1f373",
  measurementId: "G-GZX5259TMD"
};

const app = !getApps.length ? initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);