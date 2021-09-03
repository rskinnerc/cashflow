import { doc, Timestamp, setDoc } from "@firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { Balance, balanceConverter } from "../models/Balance";
import FirebaseContext from "../store/FirebaseContext";
import BalanceForm from "./BalanceForm";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
    <div className="p-2 bg-white shadow-lg rounded-lg">
      <h2 className="text-gray-800 font-bold my-3 flex flex-row justify-between items-center">
        Update Transaction{" "}
        <IoMdCloseCircleOutline
          className="text-red-700 text-xl cursor-pointer"
          onClick={() => closeForm()}
        />
      </h2>
      <BalanceForm
        balance={balance}
        submitFn={(balance: Balance) => update(balance)}
      />
    </div>
  );
};

export default UpdateBalance;
