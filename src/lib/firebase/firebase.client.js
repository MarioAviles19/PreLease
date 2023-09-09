// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAnalytics} from "firebase/analytics"
import {getFirestore} from "firebase/firestore";
import {getAuth, setPersistence, inMemoryPersistence} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4h3h71nGHXhJcdd7BI7CTPPd2JIvMnyg",
  authDomain: "pl-rhc-data.firebaseapp.com",
  projectId: "pl-rhc-data",
  storageBucket: "pl-rhc-data.appspot.com",
  messagingSenderId: "464747479294",
  appId: "1:464747479294:web:c71cb642fd7e036fbe65af",
  measurementId: "G-WH8NV1E5LR"
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
export const app = firebaseApp;

auth.setPersistence(inMemoryPersistence)