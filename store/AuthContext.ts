import { User } from "firebase/auth";
import { createContext } from "react";

export interface IAuthContext {
    user: null | User
    isLoggedIn: boolean
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    isLoggedIn: false
})

export default AuthContext