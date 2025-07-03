import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBshRxg2LwXSTPMgFy8AepFDc2y0GFDl4",
  authDomain: "truflo-ad1f0.firebaseapp.com",
  projectId: "truflo-ad1f0",
  storageBucket: "truflo-ad1f0.appspot.com",
  messagingSenderId: "616818192255",
  appId: "1:616818192255:web:b3dfeb7391c3df31f3b44a",
  measurementId: "G-5NXYJC6E03"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);