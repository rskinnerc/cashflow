import { FirebaseApp, initializeApp, getApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDM8qp0Zv6hVQWL79l5VvYk-V83Ijz1034",
    authDomain: "pockets-dev.firebaseapp.com",
    projectId: "pockets-dev",
    storageBucket: "pockets-dev.appspot.com",
    messagingSenderId: "592374338423",
    appId: "1:592374338423:web:2800c6750d416ac82d0772",
    measurementId: "G-SWLZXS0HV3"
};

function firebaseInit() {
    let firebaseApp: FirebaseApp

    try {
        firebaseApp = getApp()
        console.log("FirebaseApp Already initialized:", firebaseApp)
    } catch (error) {
        firebaseApp = initializeApp(firebaseConfig)
        console.log("FirebaseApp Initialized:", firebaseApp)
    }
    const db = getFirestore()
    const auth = getAuth()


    if (process.env.NODE_ENV === 'development') {
        connectAuthEmulator(auth, "http://localhost:9099");
        connectFirestoreEmulator(db, 'localhost', 8082);
    }

    return { firebaseApp, db, auth }
}

export default firebaseInit
