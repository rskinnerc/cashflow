import { Balance as BalanceModel } from "../models/Balance";
import FirebaseContext from "../store/FirebaseContext";
import { FunctionComponent, SyntheticEvent, useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import Status from "./Status";
import useCurrencyFormat from "../lib/useCurrencyFormat";
export interface BalanceProps {
  balance: BalanceModel;
  reload: Function;
}

const Balance: FunctionComponent<BalanceProps> = ({ balance, reload }) => {
  const { db } = useContext(FirebaseContext);

  async function remove(e: SyntheticEvent, id: string) {
    try {
      e.stopPropagation();
      if (confirm("Are you sure you want to remove this transaction?")) {
        await deleteDoc(doc(db, "balances", id));
        reload();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className=" flex flex-row justify-evenly items-center bg-gray-800 rounded-md my-2">
      <div className="w-9/12 text-sm flex flex-col items-start p-2 text-white">
        <span>
          <span className="rounded-md border text-blue-400 border-blue-400 text-xs p-0.5 mr-2">
            {balance.type}
          </span>
          {balance.concept}
        </span>
        <span className="font-bold">
          {useCurrencyFormat(balance.currency, balance.value)}
        </span>
        <span>Date: {balance.fDate}</span>
      </div>
      <span className="w-2/12 self-start mt-1 mr-1">
        <Status status={balance.status} />
      </span>
      <button
        className="w-1/12 self-start mt-1 mr-1"
        title="Delete"
        onClick={(e) => remove(e, balance.id)}
      >
        🗑️
      </button>
    </div>
  );
};

export default Balance;
