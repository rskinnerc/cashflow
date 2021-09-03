import { addDoc, collection } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { Pocket, pocketConverter } from "../models/Pocket";
import AuthContext from "../store/AuthContext";
import FirebaseContext from "../store/FirebaseContext";
import PocketForm from "./PocketForm";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
    <div className="p-2 bg-white shadow-lg rounded-lg">
      <h2 className="text-gray-800 font-bold my-3 flex flex-row justify-between items-center">
        New Pocket{" "}
        <IoMdCloseCircleOutline
          className="text-red-700 text-xl cursor-pointer"
          onClick={() => closeForm()}
        />
      </h2>

      <PocketForm
        pocket={pocket}
        submitFn={(pocket: Pocket) => create(pocket)}
      />
    </div>
  );
};

export default NewPocket;
