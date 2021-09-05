import { FunctionComponent } from "react";
import useCurrencyFormat from "../lib/useCurrencyFormat";

export interface PocketsSummaryProps {
  usd: number;
  cop: number;
}

const PocketsSummary: FunctionComponent<PocketsSummaryProps> = ({
  usd,
  cop,
}) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg flex sm:flex-row flex-col justify-around w-full gap-3">
      <div>
        <h1 className="text-sm tracking-wide text-center text-gray-500">
          TOTAL USD
        </h1>
        <p className="font-semibold text-gray-700 text-xl text-center">
          {useCurrencyFormat("USD", usd)}
        </p>
      </div>
      <div>
        <h1 className="text-sm tracking-wide text-center text-gray-500">
          TOTAL COP
        </h1>
        <p className="font-semibold text-gray-700 text-xl text-center">
          {useCurrencyFormat("COP", cop)}
        </p>
      </div>
    </div>
  );
};

export default PocketsSummary;
