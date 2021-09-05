import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { ReactElement, useContext, useEffect, useState } from "react";
import BalanceGraph from "../components/BalanceGraph";
import Navbar from "../components/Navbar";
import { Balance as BalanceModel, balanceConverter } from "../models/Balance";
import AuthContextProvider from "../store/AuthContextProvider";
import Balance from "../components/Balance";
import {
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  format,
  parse,
} from "date-fns";
import FirebaseContext from "../store/FirebaseContext";
import AuthContext from "../store/AuthContext";
import NewBalance from "../components/NewBalance";
import UpdateBalance from "../components/UpdateBalance";
import Empty from "../components/Empty";
import { useRouter } from "next/router";
import { MdAccountBalance } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage } from "formik";
export interface Filters {
  start: Date;
  end: Date;
  currency: string;
}
import * as Yup from "yup";

const Balances: NextPageWithLayout = () => {
  const [type, setType] = useState("INCOME");
  const [filters, setFilters] = useState<Filters>(formatFilters());
  const [transactions, setTransactions] = useState<BalanceModel[]>([]);
  const [filteredBalances, setFilteredBalances] = useState<BalanceModel[]>();
  const [formMode, setFormMode] = useState<string | boolean>(false);
  const [editing, setEditing] = useState<BalanceModel | null>(null);
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

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
    router.query.new ? setFormMode("creating") : loadTransactions();
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
    <>
      <h2 className="text-2xl font-bold flex flex-row gap-1 items-center my-3 lg:my-5">
        <MdAccountBalance className="text-gray-800" />
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-blue-500">
          Balances
        </span>
      </h2>
      <div className="flex flex-col md:flex-row md:justify-evenly gap-5 lg:w-11/12 lg:mx-auto">
        <div className="w-full flex flex-col">
          <Formik
            initialValues={{
              start: format(filters.start, "yyyy-MM-dd"),
              end: format(filters.end, "yyyy-MM-dd"),
              currency: filters.currency,
            }}
            validationSchema={Yup.object({
              start: Yup.string().required(),
              end: Yup.date().required(),
              currency: Yup.string().oneOf(["COP", "USD"]).required(),
            })}
            onSubmit={({ start, end, currency }) => {
              setFilters(
                formatFilters(
                  parse(start, "yyyy-MM-dd", new Date()),
                  parse(end, "yyyy-MM-dd", new Date()),
                  currency
                )
              );
            }}
          >
            <Form className="text-sm border rounded-md border-gray-200 p-1">
              <div className="flex flex-row justify-evenly">
                <label>
                  <Field type="radio" name="currency" value="USD" /> USD
                </label>
                <label>
                  <Field type="radio" name="currency" value="COP" /> COP
                </label>
                <ErrorMessage name="currency" className="text-red-600" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="start">
                  Start Date
                </label>
                <Field name="start" type="date" />
                <ErrorMessage name="start" className="text-red-600" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="end">
                  End Date
                </label>
                <Field name="end" type="date" />
                <ErrorMessage name="end" className="text-red-600" />
              </div>
              <button type="submit" className="btn mt-2">
                Load Transactions
              </button>
            </Form>
          </Formik>
          <BalanceGraph balances={transactions} currency={filters.currency} />
          <button
            className="border-2 rounded-md border-green-600 p-1 self-center"
            onClick={() => {
              setFormMode("creating");
            }}
          >
            New Balance
          </button>
        </div>

        <div className="w-full mb-7">
          <Formik
            initialValues={{
              type,
            }}
            onSubmit={({ type }) => {
              setType(type);
            }}
          >
            {() => (
              <Form className="flex flex-row gap-2 items-center text-sm border rounded-md border-gray-200 p-1">
                <label>
                  <Field type="radio" name="type" value="DEBT" /> Debts
                </label>
                <label>
                  <Field type="radio" name="type" value="INCOME" /> Income
                </label>
                <button type="submit" className="btn">
                  Filter
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-sm italic text-gray-500 my-5">Showing {type}</p>
          {!formMode && filteredBalances && filteredBalances.length > 0 && (
            <ul>
              {filteredBalances.map((b) => {
                return (
                  <li
                    key={b.id}
                    onClick={() => {
                      setFormMode("updating");
                      setEditing(b);
                    }}
                  >
                    <Balance balance={b} reload={loadTransactions} />
                  </li>
                );
              })}
            </ul>
          )}
          {!formMode && filteredBalances?.length == 0 && <Empty />}
          {formMode === "creating" && <NewBalance closeForm={closeForm} />}
          {formMode === "updating" && (
            <UpdateBalance closeForm={closeForm} balance={editing!} />
          )}
        </div>
      </div>
    </>
  );
};

Balances.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextProvider guest={false}>
      <div className="flex flex-row lg:justify-center">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 grid-rows-1 m-3 gap-2">{page}</div>
    </AuthContextProvider>
  );
};

export default Balances;
