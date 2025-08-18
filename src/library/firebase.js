// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPYA5cpszRMfl6OdRhBgHF4blt0S4qcYc",
  authDomain: "cre8tiveforge-server.firebaseapp.com",
  projectId: "cre8tiveforge-server",
  storageBucket: "cre8tiveforge-server.firebasestorage.app",
  messagingSenderId: "948111186687",
  appId: "1:948111186687:web:d858e3d369544937500aca",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
