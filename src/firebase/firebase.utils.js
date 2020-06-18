import firebase from "firebase/app";
import "firebase/database";



const firebaseConfig = {
  // YOUR FIREBASE CONFIG
};


const app = firebase.initializeApp(firebaseConfig);
export const database = app.database();