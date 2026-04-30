// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAzb11Qp0oiJ2nHWvJ2dud3rv7F-LnU0c",
  authDomain: "milkapp-bd44e.firebaseapp.com",
  projectId: "milkapp-bd44e",
  storageBucket: "milkapp-bd44e.firebasestorage.app",
  messagingSenderId: "894896601081",
  appId: "1:894896601081:web:daf37044d42d2afdb96f28",
  measurementId: "G-Y0P4PQKFMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
