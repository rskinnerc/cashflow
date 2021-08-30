import { FunctionComponent, useEffect, useState } from "react";
import { Balance } from "../models/Balance";
export interface BalanceGraphProps {
  balances: Balance[];
}

const BalanceGraph: FunctionComponent<BalanceGraphProps> = ({ balances }) => {
  const [income, setIncome] = useState(0);
  const [debts, setDebts] = useState(0);
  useEffect(() => {
    let income = 0;
    let debts = 0;
    balances.map((b) => {
      if (b.type === "INCOME") {
        income += b.value;
      }
    });

    balances.map((b) => {
      if (b.type === "DEBT") {
        debts += b.value;
      }
    });
    setIncome(income);
    setDebts(debts);
  }, [balances]);
  return (
    <div className="w-full">
      <h2>Balance Graph Component</h2>
      <p>Income: {income}</p>
      <p>Debts: {debts}</p>
    </div>
  );
};

export default BalanceGraph;
