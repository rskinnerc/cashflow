import { addDoc, collection } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { Balance, balanceConverter } from "../models/Balance";
import AuthContext from "../store/AuthContext";
import FirebaseContext from "../store/FirebaseContext";
import BalanceForm from "./BalanceForm";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
    <div className="p-2 bg-white shadow-lg rounded-lg">
      <h2 className="text-gray-800 font-bold my-3 flex flex-row justify-between items-center">
        New Transaction{" "}
        <IoMdCloseCircleOutline
          className="text-red-700 text-xl cursor-pointer"
          onClick={() => closeForm()}
        />
      </h2>
      <BalanceForm
        balance={balance}
        submitFn={(balance: Balance) => create(balance)}
      />
    </div>
  );
};

export default NewBalance;
