import { FunctionComponent, useEffect, useState } from "react";
import { Balance } from "../models/Balance";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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
    <div>
      <h2>Balance Graph Component</h2>
      <div>
        <PieChart width={300} height={120}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={[
              { name: "Income", value: income, fill: "#00AA8D" },
              { name: "Debts", value: debts, fill: "#FB008C" },
            ]}
            cx="50%"
            cy="100%"
            outerRadius={70}
            label
          />
        </PieChart>
      </div>

      <p>Income: {income}</p>
      <p>Debts: {debts}</p>
    </div>
  );
};

export default BalanceGraph;
