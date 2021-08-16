import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import FirebaseContext from "./FirebaseContext";

export interface AuthContextProviderProps {
    
}
 
const AuthContextProvider: FunctionComponent = (props) => {
    const {auth} = useContext(FirebaseContext)
    const [user, setUser] = useState<null | User>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        console.log("useEffect called from AuthContextProvider")
        const unsubscribe = onAuthStateChanged(auth, u => {
            if (u) {
                setUser(u)
                setIsLoggedIn(true)
            } else {
                setUser(null)
                setIsLoggedIn(false)
                router.replace("/auth")
            }
        })

        return unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const ctx = {
        user,
        isLoggedIn
    }

    if (!isLoggedIn) {
        return (
            <div>
                <h2>Loading Authentication</h2>
            </div>
        )
    }

    return ( 
        <AuthContext.Provider value={ctx}> 
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;