import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../config/firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const auth = getAuth();
export const signIn = (email,password) => {
  console.log('trying firebase');
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('user logged',user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

 
