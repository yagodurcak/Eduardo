import {getFirestore} from "@firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAGIR_0653iu3K_8_GXFWbaT9wTCXtkO4k",
    authDomain: "eduardo-95890.firebaseapp.com",
    projectId: "eduardo-95890",
    storageBucket: "eduardo-95890.appspot.com",
    messagingSenderId: "379007911376",
    appId: "1:379007911376:web:b65e9df26dddbc85fde5d5"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)