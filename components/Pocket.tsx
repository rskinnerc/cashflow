import { FunctionComponent } from "react";
import { Pocket as PocketModel } from "../models/Pocket";

export interface PocketProps {
    pocket: PocketModel
}
 
const Pocket: FunctionComponent<PocketProps> = ({pocket}) => {
    return ( 
        <div>
            Pocket Name: {pocket.name}: {pocket.balance} {pocket.currency}
        </div>
     );
}
 
export default Pocket;