import { doc, setDoc } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";
import { Pocket, pocketConverter } from "../models/Pocket";
import FirebaseContext from "../store/FirebaseContext";
import PocketForm from "./PocketForm";
import { IoMdCloseCircleOutline } from "react-icons/io";
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
    <div className="p-2 bg-white shadow-lg rounded-lg">
      <h2 className="text-gray-800 font-bold my-3 flex flex-row justify-between items-center">
        Update a Pocket{" "}
        <IoMdCloseCircleOutline
          className="text-red-700 text-xl cursor-pointer"
          onClick={() => closeForm()}
        />
      </h2>

      <PocketForm
        pocket={pocket}
        submitFn={(pocket: Pocket) => update(pocket)}
      />
    </div>
  );
};

export default UpdatePocket;
