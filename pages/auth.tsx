import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactElement, useContext } from "react";
import FirebaseContext from "../store/FirebaseContext";
import AuthContextProvider from "../store/AuthContextProvider";

const googleProvider = new GoogleAuthProvider();

const Auth: NextPageWithLayout = () => {
  const { auth } = useContext(FirebaseContext);
  const router = useRouter();

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.log("An error has ocurred during the authentication process");
    }
  }

  return (
    <div>
      <h2>Authentication</h2>
      <p>
        <button
          className="rounded border-red-400 border-2 p-2"
          onClick={signInWithGoogle}
        >
          Sign-in with Google
        </button>
      </p>
    </div>
  );
};

Auth.getLayout = function getLayout(page: ReactElement) {
  return <AuthContextProvider guest={true}>{page}</AuthContextProvider>;
};
export default Auth;
