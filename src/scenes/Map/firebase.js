// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCHfnIqlck-jUmlITNrdOGjVZQ_Hadi6Og",
  authDomain: "iotnhom7-c18f8.firebaseapp.com",
  databaseURL: "https://iotnhom7-c18f8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iotnhom7-c18f8",
  storageBucket: "iotnhom7-c18f8.appspot.com",
  messagingSenderId: "99161440656",
  appId: "1:99161440656:web:9ad4b86fe1f36c27eef315",
  measurementId: "G-F849R0GWWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app)