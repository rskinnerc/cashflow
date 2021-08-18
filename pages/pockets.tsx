import { ReactElement, useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Pocket as PocketModel, pocketConverter } from "../models/Pocket";
import Pocket from "../components/Pocket";
import PocketsSummary from "../components/PocketsSummary";
import AuthContextProvider from "../store/AuthContextProvider";
import FirebaseContext from "../store/FirebaseContext";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import AuthContext from "../store/AuthContext";

const POCKETS = [
  new PocketModel(1000, "COP", "Test One", true, "SOMEUID1", "POCKETID1"),
  new PocketModel(2501, "COP", "Test Two", true, "SOMEUID1", "POCKETID2"),
  new PocketModel(1200, "USD", "Test Three", true, "SOMEUID1", "POCKETID3"),
  new PocketModel(1200, "COP", "Test Three", true, "SOMEUID1", "POCKETID4"),
];
export interface PocketsProps {}

const Pockets: NextPageWithLayout = () => {
  const [pockets, setPockets] = useState<PocketModel[]>([]);
  const [usd, setUSD] = useState(0);
  const [cop, setCOP] = useState(0);
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  function calculateTotal(currency: string, pockets: PocketModel[]) {
    let total = 0;
    pockets
      .filter((p) => p.currency === currency)
      .map((p) => (total += p.balance));
    return total;
  }

  useEffect(() => {
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

    loadPockets();
  }, []);

  return (
    <div>
      <h2>Pockets Page</h2>
      <div>
        <h2>Pockets Summary</h2>
        <PocketsSummary usd={usd} cop={cop} />
      </div>
      <ul>
        {pockets &&
          pockets.map((pocket) => {
            return <Pocket pocket={pocket} key={pocket.id} />;
          })}
      </ul>
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
