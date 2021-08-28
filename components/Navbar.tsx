import { signOut as authSignOut } from "firebase/auth";
import Link from "next/link";
import { FunctionComponent, useContext } from "react";
import AuthContext from "../store/AuthContext";
import FirebaseContext from "../store/FirebaseContext";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";

export interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { pathname } = useRouter();
  const { auth } = useContext(FirebaseContext);
  let { signOut } = useContext(AuthContext);

  async function signUserOut() {
    await authSignOut(auth);
    signOut();
  }

  function isActive(path: string) {
    return path == pathname ? " text-yellow-200 font-semibold" : "";
  }

  return (
    <div className="w-full md:w-3/5 lg:w-1/2 flex p-1 md:p-2 lg:p-3 text-yellow-400 text-sm sm:text-base bg-gray-800 justify-evenly items-center md:rounded-br-lg lg:rounded-b-lg">
      <Link href="/">
        <a className={"flex items-center" + isActive("/")}>
          <BsFillHouseDoorFill className="" />
          <span className="hidden md:inline md:ml-1">Home</span>
        </a>
      </Link>
      <Link href="/balances">
        <a className={isActive("/balances")}>Balances</a>
      </Link>
      <Link href="/pockets">
        <a className={isActive("/pockets")}>Pockets</a>
      </Link>
      <button className="text-red-500" onClick={signUserOut}>
        <IoMdLogOut />
      </button>
    </div>
  );
};

export default Navbar;
