import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD3dyrSryvlRYj6uqNpWjB4liAvoNb9I8",
  authDomain: "truflo-ecae1.firebaseapp.com",
  projectId: "truflo-ecae1",
  storageBucket: "truflo-ecae1.firebasestorage.app",
  messagingSenderId: "314020150425",
  appId: "1:314020150425:web:f73a88deb06fb940c28c08",
  measurementId: "G-CBPRZF9S09"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);