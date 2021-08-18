import { doc, setDoc } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { Pocket, pocketConverter } from "../models/Pocket";
import FirebaseContext from "../store/FirebaseContext";
import PocketForm from "./PocketForm";

export interface UpdatePocketProps {
  pocket: Pocket;
  closeForm: Function;
}

const UpdatePocket: FunctionComponent<UpdatePocketProps> = ({
  pocket,
  closeForm,
}) => {
  const { db } = useContext(FirebaseContext);

  async function update(pocket: Pocket) {
    try {
      const docRef = doc(db, "pockets", pocket.id).withConverter(
        pocketConverter
      );
      await setDoc(docRef, pocket);
      closeForm(true);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div>
      <h2>Update a Pocket</h2>
      <button
        className="border rounded-md p-1 border-red-500"
        onClick={() => closeForm()}
      >
        Close Form
      </button>
      <PocketForm
        pocket={pocket}
        submitFn={(pocket: Pocket) => update(pocket)}
      />
    </div>
  );
};

export default UpdatePocket;
