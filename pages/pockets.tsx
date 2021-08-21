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
    <div>
      <h2>Pockets Page</h2>
      <button
        className="text-green-500 rounded-md border-green-600 border-2 p-1"
        onClick={() => {
          setFormMode("creating");
        }}
      >
        New Pocket
      </button>
      <div>
        <h2>Pockets Summary</h2>
        <PocketsSummary usd={usd} cop={cop} />
      </div>
      {!formMode && pockets && pockets.length > 0 && (
        <ul>
          {pockets.map((pocket) => {
            return (
              <li
                className="border rounded-md border-blue-400 m-1 p-1"
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
  );
};

Pockets.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextProvider>
      <Navbar />
      {page}
    </AuthContextProvider>
  );
};

export default Pockets;
