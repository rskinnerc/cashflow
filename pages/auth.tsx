import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import FirebaseContext from "../store/FirebaseContext";
 
const googleProvider = new GoogleAuthProvider()

const Auth: NextPage = () => {
    const {auth} = useContext(FirebaseContext)
    const router = useRouter()

    async function signInWithGoogle () {
        try {
            await signInWithPopup(auth, googleProvider)
            router.push("/")
        } catch (error) {
            console.log("An error has ocurred during the authentication process")
        }
    }

    return ( 
        <div>
            <h2>Authentication</h2>
            <p>
                <button className="rounded border-red-400 border-2 p-2" onClick={signInWithGoogle}>Sign-in with Google</button>
            </p>
        </div>
     );
}
 
export default Auth;