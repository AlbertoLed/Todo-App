import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB4BSIhFz02hvXjgt-rbd7m6XmfxPUcDU",
  authDomain: "todo-app-b6817.firebaseapp.com",
  projectId: "todo-app-b6817",
  storageBucket: "todo-app-b6817.appspot.com",
  messagingSenderId: "1044683545464",
  appId: "1:1044683545464:web:b14071db8ab6d19a34c68d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const todoCollection = collection(db, "todo")