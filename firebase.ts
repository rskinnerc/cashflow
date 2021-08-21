import { FirebaseApp, initializeApp, getApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

function firebaseInit() {
  let firebase: FirebaseApp;

  try {
    firebase = getApp();
    console.log("FirebaseApp Already initialized:", firebase);
  } catch (error) {
    firebase = initializeApp(firebaseConfig);
    console.log("FirebaseApp Initialized:", firebase);
  }
  const db = getFirestore();
  const auth = getAuth();

  if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8082);
  }

  return { firebase, db, auth };
}

export default firebaseInit;
