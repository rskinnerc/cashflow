/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";
import Link from "next/link";
import AuthContextProvider from "../store/AuthContextProvider";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";

const Home: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);

  // TODO: Implement No User component
  if (!user) {
    return <h2>No User</h2>;
  }

  return (
    <>
      <div className="row-span-1 flex flex-col items-center my-5">
        <img
          src={user.photoURL!}
          alt={user.displayName!}
          className="ring-2 rounded-full ring-gray-200 sm:w-28 w-24 mb-5"
        ></img>

        <h3 className="text-lg">Welcome Back</h3>
        <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-blue-500">
          {user!.displayName!}
        </h1>
        <h3 className="italic font-light">{user!.email}</h3>
      </div>
      <div className="row-span-1 mt-10 flex flex-col items-center justify-start sm:gap-2 gap-2">
        <Link href="/balances?new=true">
          <a className="btn">Add Transaction</a>
        </Link>
        <Link href="/pockets?new=true">
          <a className="btn">New Pocket</a>
        </Link>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextProvider guest={false}>
      <Navbar />
      <div className="grid grid-cols-1 grid-rows-1 m-5">{page}</div>
    </AuthContextProvider>
  );
};

export default Home;
