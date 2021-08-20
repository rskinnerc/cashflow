import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { ReactElement, useContext, useEffect, useState } from "react";
import BalanceGraph from "../components/BalanceGraph";
import Navbar from "../components/Navbar";
import { Balance as BalanceModel, balanceConverter } from "../models/Balance";
import AuthContextProvider from "../store/AuthContextProvider";
import Balance from "../components/Balance";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import FirebaseContext from "../store/FirebaseContext";
import AuthContext from "../store/AuthContext";

export interface Filters {
  start: Date;
  end: Date;
  currency: string;
}

const Balances: NextPageWithLayout = () => {
  const [type, setType] = useState("INCOME");
  const [filters, setFilters] = useState<Filters>(formatFilters());
  const [transactions, setTransactions] = useState<BalanceModel[]>([]);
  const [filteredBalances, setFilteredBalances] = useState<BalanceModel[]>();
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  async function loadTransactions() {
    const balancesRef = collection(db, "balances");

    const q = query(
      balancesRef,
      orderBy("date"),
      where("uid", "==", user!.uid),
      where("date", ">=", filters.start),
      where("date", "<=", filters.end),
      where("currency", "==", filters.currency)
    ).withConverter(balanceConverter);

    const result = await getDocs(q);
    const docs = result.docs.map((b) => b.data());
    setTransactions(docs);
  }

  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    function filterTransactions() {
      return transactions.filter((b) => b.type === type);
    }

    setFilteredBalances(filterTransactions());
  }, [type, transactions]);

  function formatFilters(start?: Date, end?: Date, currency: string = "COP") {
    start = !start ? startOfMonth(new Date()) : startOfDay(start);
    end = !end ? endOfMonth(new Date()) : endOfDay(end);
    return { start, end, currency };
  }

  return (
    <div>
      <h2>Balances Page</h2>
      <BalanceGraph balances={transactions} />
      <hr />
      <button onClick={() => setType("DEBT")}>Change to DEBT</button>
      <button onClick={() => setType("INCOME")}>Change to INCOME</button>
      <button
        onClick={() =>
          setFilters(
            formatFilters(new Date(2021, 6, 11), new Date(2021, 6, 25), "USD")
          )
        }
      >
        Change to July
      </button>
      <ul>
        {transactions &&
          filteredBalances?.map((b) => {
            return (
              <li key={b.id}>
                <Balance balance={b} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

Balances.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextProvider>
      <Navbar />
      {page}
    </AuthContextProvider>
  );
};

export default Balances;
