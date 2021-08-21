import { addDoc, collection } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { Balance, balanceConverter } from "../models/Balance";
import AuthContext from "../store/AuthContext";
import FirebaseContext from "../store/FirebaseContext";
import BalanceForm from "./BalanceForm";

export interface NewBalanceProps {
  closeForm: Function;
}

const NewBalance: FunctionComponent<NewBalanceProps> = ({ closeForm }) => {
  const { user } = useContext(AuthContext);
  const { db } = useContext(FirebaseContext);
  const balance = new Balance();

  async function create(balance: Balance) {
    try {
      balance.uid = user!.uid;
      const docRef = collection(db, "balances").withConverter(balanceConverter);
      await addDoc(docRef, balance);
      closeForm(true);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div>
      <h2>New Balance Component</h2>
      <button
        className="border-2 rounded-md border-red-600 p-1"
        onClick={() => {
          closeForm();
        }}
      >
        Close Form
      </button>
      <BalanceForm
        balance={balance}
        submitFn={(balance: Balance) => create(balance)}
      />
    </div>
  );
};

export default NewBalance;
