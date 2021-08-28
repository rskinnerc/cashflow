import { deleteDoc, doc } from "firebase/firestore";
import { FunctionComponent, SyntheticEvent, useContext } from "react";
import { Pocket as PocketModel } from "../models/Pocket";
import FirebaseContext from "../store/FirebaseContext";
import Status from "./Status";

export interface PocketProps {
  pocket: PocketModel;
  reload: Function;
}

const Pocket: FunctionComponent<PocketProps> = ({ pocket, reload }) => {
  const { db } = useContext(FirebaseContext);

  async function remove(e: SyntheticEvent, id: string) {
    try {
      e.stopPropagation();
      if (confirm("Are you sure you want to remove this pocket?")) {
        await deleteDoc(doc(db, "pockets", id));
        reload();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className=" flex flex-row justify-evenly items-center">
      <span className="w-8/12 text-yellow-400 text-sm">
        {pocket.name}
        <br />
        <span className="text-yellow-200 font-semibold text-base">
          {pocket.balance} {pocket.currency}
        </span>
      </span>
      <span className="w-3/12">
        <Status status={pocket.status} />
      </span>
      <button
        className="w-1/12"
        title="Delete"
        onClick={(e) => remove(e, pocket.id)}
      >
        🗑️
      </button>
    </div>
  );
};

export default Pocket;
