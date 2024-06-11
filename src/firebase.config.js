// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9p8Uvgljkki4uV_hPd2NNEd-SSjRGKoI",
  authDomain: "fir-auth-facturex-profile.firebaseapp.com",
  projectId: "fir-auth-facturex-profile",
  storageBucket: "fir-auth-facturex-profile.appspot.com",
  messagingSenderId: "636329332343",
  appId: "1:636329332343:web:1d98a6d3fbe410c4cd8072"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);