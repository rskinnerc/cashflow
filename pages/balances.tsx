import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { ReactElement, useContext, useEffect, useState } from "react";
import BalanceGraph from "../components/BalanceGraph";
import Navbar from "../components/Navbar";
import { Balance as BalanceModel, balanceConverter } from "../models/Balance";
import AuthContextProvider from "../store/AuthContextProvider";
import Balance from "../components/Balance";
import { startOfMonth, endOfMonth, startOfDay, endOfDay } from "date-fns";
import FirebaseContext from "../store/FirebaseContext";
import AuthContext from "../store/AuthContext";
import NewBalance from "../components/NewBalance";

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
  const [formMode, setFormMode] = useState<string | boolean>(false);
  const [editing, setEditing] = useState<BalanceModel | null>(null);
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

  function closeForm(reload = false) {
    setFormMode(false);

    reload && loadTransactions();
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
            formatFilters(new Date(2021, 6, 8), new Date(2021, 6, 25), "COP")
          )
        }
      >
        Change to July
      </button>
      <button
        className="border-2 rounded-md border-green-600 p-1"
        onClick={() => {
          setFormMode("creating");
        }}
      >
        New Balance
      </button>
      {!formMode && (
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
      )}
      {formMode === "creating" && <NewBalance closeForm={closeForm} />}
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
