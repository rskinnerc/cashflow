import { ReactElement, useContext } from "react";
import Link from "next/link";
import AuthContextProvider from "../store/AuthContextProvider";
import Navbar from "../components/Navbar";
import AuthContext from "../store/AuthContext";

const Home: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1 className="font-semibold text-2xl">Home Page</h1>

      <hr />
      <Link href="/balances?new=true">Balances</Link>
      <Link href="/pockets?new=true">Pockets</Link>
      <Link href="/auth">Auth</Link>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextProvider>
      <Navbar />
      {page}
    </AuthContextProvider>
  );
};

export default Home;
