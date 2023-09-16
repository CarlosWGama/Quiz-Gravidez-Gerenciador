import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAfg4Mdm9YAFXDCtNvYLWemYZO4vu-9W3c",
    authDomain: "teste-3b3c1.firebaseapp.com",
    projectId: "teste-3b3c1",
    storageBucket: "teste-3b3c1.appspot.com",
    messagingSenderId: "597506147671",
    appId: "1:597506147671:web:c133d11e06edcd7ef66a12",
    measurementId: "G-JQ87DPM0N5"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore();

  export { auth, db };

