import { ReactElement, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Pocket as PocketModel, pocketConverter } from "../models/Pocket";
import Pocket from "../components/Pocket";
import PocketsSummary from "../components/PocketsSummary";
import AuthContextProvider from "../store/AuthContextProvider";
import FirebaseContext from "../store/FirebaseContext";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import AuthContext from "../store/AuthContext";
import NewPocket from "../components/NewPocket";
import UpdatePocket from "../components/UpdatePocket";
import Empty from "../components/Empty";
import { useRouter } from "next/router";
import { IoWallet } from "react-icons/io5";
import { FaCog } from "react-icons/fa";
export interface PocketsProps {}

const Pockets: NextPageWithLayout = () => {
  const [pockets, setPockets] = useState<PocketModel[]>([]);
  const [usd, setUSD] = useState(0);
  const [cop, setCOP] = useState(0);
  const [formMode, setFormMode] = useState<string | boolean>(false);
  const [editing, setEditing] = useState<PocketModel | null>(null);
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  function calculateTotal(currency: string, pockets: PocketModel[]) {
    let total = 0;
    pockets
      .filter((p) => p.currency === currency)
      .map((p) => (total += p.balance));
    return total;
  }

  async function loadPockets() {
    const pocketsRef = collection(db, "pockets");

    const q = query(
      pocketsRef,
      where("uid", "==", user!.uid),
      orderBy("currency"),
      orderBy("balance", "desc")
    ).withConverter(pocketConverter);

    const result = await getDocs(q);
    const docs = result.docs.map((p) => p.data());
    setPockets(docs);
    setCOP(calculateTotal("COP", docs));
    setUSD(calculateTotal("USD", docs));
  }

  useEffect(() => {
    router.query.new ? setFormMode("creating") : loadPockets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeForm(reload: boolean) {
    setFormMode(false);
    setEditing(null);

    reload && loadPockets();
  }

  return (
    <>
      <h2 className="text-2xl font-bold flex flex-row gap-1 items-center lg:w-10/12 my-3 lg:my-5">
        <IoWallet className="text-gray-800" />
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-blue-500">
          Pockets
        </span>
      </h2>

      <div className="flex lg:flex-row flex-col items-center lg:justify-evenly lg:items-start gap-5 lg:w-11/12 lg:mx-auto">
        <div className="flex flex-col items-center gap-5 w-full">
          <PocketsSummary usd={usd} cop={cop} />
          <button
            className="btn-success"
            onClick={() => {
              setFormMode("creating");
            }}
          >
            Add pocket
          </button>
        </div>
        <div className="w-full">
          {!formMode && pockets && pockets.length > 0 && (
            <ul>
              <li className="p-4 mb-3 bg-white shadow-lg rounded-lg flex flex-row justify-evenly items-center">
                <span className="w-8/12 text-sm">
                  Pocket Name <br />{" "}
                  <span className="font-semibold text-base">Value</span>
                </span>
                <span className="w-3/12 text-sm sm:text-base">Status</span>
                <span className="w-1/12 text-center text-sm sm:text-base">
                  <FaCog className="text-xl" />
                </span>
              </li>
              {pockets.map((pocket) => {
                return (
                  <li
                    className="p-3 bg-gray-800 shadow-md my-2 rounded-md cursor-pointer"
                    title="Edit"
                    key={pocket.id}
                    onClick={() => {
                      setFormMode("updating");
                      setEditing(pocket);
                    }}
                  >
                    <Pocket pocket={pocket} reload={loadPockets} />
                  </li>
                );
              })}
            </ul>
          )}
          {!formMode && pockets.length == 0 && <Empty />}
          {formMode === "creating" && <NewPocket closeForm={closeForm} />}
          {formMode === "updating" && (
            <UpdatePocket pocket={editing!} closeForm={closeForm} />
          )}
        </div>
      </div>
    </>
  );
};

Pockets.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextProvider guest={false}>
      <div className="flex flex-row lg:justify-center">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 grid-rows-1 m-3 gap-2">{page}</div>
    </AuthContextProvider>
  );
};

export default Pockets;
