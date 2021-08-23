import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactElement, useContext } from "react";
import FirebaseContext from "../store/FirebaseContext";
import AuthContextProvider from "../store/AuthContextProvider";
import { FcGoogle } from "react-icons/fc";

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
    <>
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-blue-500 mb-7">
          Sing In
        </h2>
        <button
          className="btn flex flex-row items-center gap-1"
          onClick={signInWithGoogle}
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>
        <p className="p-4 text-center text-sm text-gray-600 sm:w-1/2 w-10/12">
          Manage your finances from one place in the cloud. Sign in or create an
          account using Google.
        </p>
      </div>
    </>
  );
};

Auth.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextProvider guest={true}>
      <div className="flex flex-col justify-center items-center h-screen">
        {page}
      </div>
    </AuthContextProvider>
  );
};
export default Auth;
