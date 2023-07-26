// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import {getAuth, setPersistence, inMemoryPersistence} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcTQSTUEFxfAHV66vUOIK7fGgCx0Nv-c8",
  authDomain: "prelease-de6cf.firebaseapp.com",
  projectId: "prelease-de6cf",
  storageBucket: "prelease-de6cf.appspot.com",
  messagingSenderId: "890274296307",
  appId: "1:890274296307:web:d4e608ff11ab8d3418a286",
  measurementId: "G-RCKRT6Y9FB"
};

let firebaseApp;

if(!getApps().length){
    firebaseApp = initializeApp(firebaseConfig)
} else{
    firebaseApp = getApp();
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}

export const storage = getStorage(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

auth.setPersistence(inMemoryPersistence)