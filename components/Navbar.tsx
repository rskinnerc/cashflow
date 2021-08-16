import { signOut as authSignOut } from "firebase/auth";
import Link from "next/link";
import { FunctionComponent, useContext } from "react";
import AuthContext from "../store/AuthContext";
import FirebaseContext from "../store/FirebaseContext";

export interface NavbarProps {
    
}
 
const Navbar: FunctionComponent<NavbarProps> = () => {
    const {auth} = useContext(FirebaseContext)
    let {signOut} = useContext(AuthContext)

    async function signUserOut () {
        await authSignOut(auth)
        signOut()
    }

    return ( 
        <div className="w-full bg-gray-900 flex justify-evenly p-4">
            <Link href="/" ><a className="text-gray-200 font-bold">Home</a></Link>
            <Link href="/balances"><a className="text-gray-200 font-bold">Balances</a></Link>
            <Link href="/pockets"><a className="text-gray-200 font-bold">Pockets</a></Link>
            <button className="text-red-400" onClick={signUserOut}>Sign-Out</button>
        </div>
     );
}
 
export default Navbar;