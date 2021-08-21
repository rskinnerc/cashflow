import { doc, Timestamp, setDoc } from "@firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { Balance, balanceConverter } from "../models/Balance";
import FirebaseContext from "../store/FirebaseContext";
import BalanceForm from "./BalanceForm";

export interface UpdateBalanceProps {
  balance: Balance;
  closeForm: Function;
}

const UpdateBalance: FunctionComponent<UpdateBalanceProps> = ({
  balance,
  closeForm,
}) => {
  const { db } = useContext(FirebaseContext);

  async function update(balance: Balance) {
    try {
      balance.fUpdatedAt = Timestamp.now();
      const docRef = doc(db, "balances", balance.id).withConverter(
        balanceConverter
      );
      await setDoc(docRef, balance);
      closeForm(true);
    } catch (error) {
      console.log("Error from Firestore: ", error);
    }
  }

  return (
    <div>
      <h2>Update Balance Component</h2>
      <button
        className="border-2 rounded-md border-red-600 p-1"
        onClick={() => {
          closeForm();
        }}
      >
        New Balance
      </button>
      <BalanceForm
        balance={balance}
        submitFn={(balance: Balance) => update(balance)}
      />
    </div>
  );
};

export default UpdateBalance;
