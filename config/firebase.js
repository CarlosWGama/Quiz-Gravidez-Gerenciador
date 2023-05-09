import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDB7v5TPkuIbVnrfzqyscYgHLo_y5bBpDw",
    authDomain: "quiz-gravidez.firebaseapp.com",
    projectId: "quiz-gravidez",
    storageBucket: "quiz-gravidez.appspot.com",
    messagingSenderId: "743749491903",
    appId: "1:743749491903:web:b5d122c840ab43f1fc7a0a",
    measurementId: "G-SB0D2K8K2C"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore();

  export { auth, db };

