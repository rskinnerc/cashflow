import { User } from "firebase/auth";
import { createContext } from "react";

export interface IAuthContext {
    user: null | User
    isLoggedIn: boolean
    signOut: VoidFunction
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    isLoggedIn: false,
    signOut: () => { }
})

export default AuthContext