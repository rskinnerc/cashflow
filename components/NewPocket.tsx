import { addDoc, collection } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { Pocket, pocketConverter } from "../models/Pocket";
import AuthContext from "../store/AuthContext";
import FirebaseContext from "../store/FirebaseContext";
import PocketForm from "./PocketForm";

export interface NewPocketProps {
  closeForm: Function;
}

const NewPocket: FunctionComponent<NewPocketProps> = ({ closeForm }) => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const pocket = new Pocket();

  async function create(pocket: Pocket) {
    try {
      pocket.uid = user!.uid;
      const docRef = collection(db, "pockets").withConverter(pocketConverter);
      await addDoc(docRef, pocket);
      closeForm(true);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div>
      <h2>New Pocket</h2>
      <button
        className="border rounded-md p-1 border-red-500"
        onClick={() => closeForm()}
      >
        Close Form
      </button>
      <PocketForm
        pocket={pocket}
        submitFn={(pocket: Pocket) => create(pocket)}
      />
    </div>
  );
};

export default NewPocket;
