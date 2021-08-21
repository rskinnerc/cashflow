import { Balance as BalanceModel } from "../models/Balance";
import FirebaseContext from "../store/FirebaseContext";
import { FunctionComponent, SyntheticEvent, useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";

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
    <div>
      Balance Concept: {balance.concept} for {balance.value} {balance.currency}{" "}
      <button onClick={(e) => remove(e, balance.id)}>🗑️</button>
    </div>
  );
};

export default Balance;
