import { deleteDoc, doc } from "firebase/firestore";
import { FunctionComponent, SyntheticEvent, useContext } from "react";
import { Pocket as PocketModel } from "../models/Pocket";
import FirebaseContext from "../store/FirebaseContext";

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
    <div>
      Pocket Name: {pocket.name}: {pocket.balance} {pocket.currency}{" "}
      <button onClick={(e) => remove(e, pocket.id)}>🗑️</button>
    </div>
  );
};

export default Pocket;
