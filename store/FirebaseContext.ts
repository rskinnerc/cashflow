import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { FirebaseFirestore } from "firebase/firestore";
import { createContext } from "react";

export interface IFirebaseContext {
    firebase: FirebaseApp
    auth: Auth
    db: FirebaseFirestore
}
const FirebaseContext = createContext({} as IFirebaseContext)

export default FirebaseContext