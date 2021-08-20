import { FunctionComponent } from "react";
import { Balance } from "../models/Balance";

export interface BalanceGraphProps {
  balances: Balance[];
}

const BalanceGraph: FunctionComponent<BalanceGraphProps> = ({ balances }) => {
  return (
    <div>
      <h2>Balance Graph Component</h2>
    </div>
  );
};

export default BalanceGraph;
