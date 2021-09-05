import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/router";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import AuthContext from "./AuthContext";
import FirebaseContext from "./FirebaseContext";

export interface AuthContextProviderProps {
  guest?: boolean;
}

const AuthContextProvider: FunctionComponent<AuthContextProviderProps> = (
  props
) => {
  const { auth } = useContext(FirebaseContext);
  const [user, setUser] = useState<null | User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u && !props.guest) {
        setUser(u);
        setIsLoggedIn(true);
      } else if (u && props.guest) {
        setUser(u);
        setIsLoggedIn(true);
        router.replace("/");
      } else {
        setUser(u);
        setIsLoggedIn(false);
        router.replace("/auth");
      }
    });

    return unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, props.guest]);

  function signOut() {
    setUser(null);
  }

  const ctx = {
    user,
    isLoggedIn,
    signOut,
  };

  if (!isLoggedIn && !props.guest) {
    return (
      <div className="h-screen w-full z-50 flex flex-col items-center justify-center bg-gray-200">
        <Loading />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
