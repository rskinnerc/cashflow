import { FunctionComponent } from "react";
import { Balance as BalanceModel } from "../models/Balance";
import Link from "next/link";

export interface BalanceProps {
  balance: BalanceModel;
}

const Balance: FunctionComponent<BalanceProps> = ({ balance }) => {
  return (
    <div>
      Balance Concept: {balance.concept} for {balance.value} {balance.currency}
      <Link href={`/balances/${balance.id}`}>
        <a>✏️</a>
      </Link>
    </div>
  );
};

export default Balance;
