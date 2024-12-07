import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Import getAuth function from firebase/auth
import { getStorage } from 'firebase/storage'; // Import the getStorage function

import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
  apiKey: "AIzaSyBcmJT52G3jF0vGqGobmZsGAOFUaQUScJM",
  authDomain: "tutor-abda0.firebaseapp.com",
  projectId: "tutor-abda0",
  storageBucket: "tutor-abda0.firebasestorage.app",
  messagingSenderId: "971198852859",
  appId: "1:971198852859:web:69ddb9e8cdb82621baca5e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth object
const storage = getStorage(app); // Initialize storage object
const db = getDatabase(app);
const firebaseApp = initializeApp(firebaseConfig);
const functions = getFunctions(firebaseApp);

export { app, db , auth, storage ,firebaseApp, functions}; 


