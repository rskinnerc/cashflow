import { FunctionComponent, useEffect, useState } from "react";
import useCurrencyFormat from "../lib/useCurrencyFormat";
import { Balance } from "../models/Balance";
export interface BalanceGraphProps {
  balances: Balance[];
  currency: string;
}

const BalanceGraph: FunctionComponent<BalanceGraphProps> = ({
  balances,
  currency,
}) => {
  const [income, setIncome] = useState(0);
  const [debts, setDebts] = useState(0);
  const [percents, setPercents] = useState({ income: 0, debts: 0 });
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

  useEffect(() => {
    const calculated = {
      income: (100 * income) / (income + debts),
      debts: (100 * debts) / (income + debts),
    };
    setPercents(calculated);
  }, [income, debts]);

  return (
    <div className="w-full md:my-5">
      {(percents.income > 0 || percents.debts > 0) && (
        <div className="flex flex-row">
          <span
            className="bg-blue-500 h-2 p-0.5 rounded-l-md"
            style={{ width: `${percents.income}%` }}
          ></span>
          <span
            className="bg-red-500 h-2 p-0.5 rounded-r-md"
            style={{ width: `${percents.debts}%` }}
          ></span>
        </div>
      )}
      <p className="flex flex-row items-center justify-between gap-8">
        <span className="text-blue-500 text-xs font-semibold">INCOME:</span>{" "}
        <span className="font-semibold text-blue-500">
          {useCurrencyFormat(currency, income)}
        </span>
      </p>
      <p className="flex flex-row items-center justify-between gap-8">
        <span className="text-red-500 text-xs font-semibold">DEBTS</span>{" "}
        <span className="font-semibold text-red-500">
          {useCurrencyFormat(currency, debts)}
        </span>
      </p>
    </div>
  );
};

export default BalanceGraph;
