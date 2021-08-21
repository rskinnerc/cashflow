import { FunctionComponent } from "react";
import { Balance as BalanceModel } from "../models/Balance";

export interface BalanceProps {
  balance: BalanceModel;
}

const Balance: FunctionComponent<BalanceProps> = ({ balance }) => {
  return (
    <div>
      Balance Concept: {balance.concept} for {balance.value} {balance.currency}
    </div>
  );
};

export default Balance;
