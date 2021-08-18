import { FunctionComponent } from "react";

export interface PocketsSummaryProps {
  usd: number;
  cop: number;
}

const PocketsSummary: FunctionComponent<PocketsSummaryProps> = ({
  usd,
  cop,
}) => {
  function currencyFormat(currency: string, value: number) {
    let formatter = new Intl.NumberFormat(["en-US", "es-CO"], {
      style: "currency",
      currency,
    });

    return formatter.format(value);
  }

  return (
    <div>
      <p>USD: {currencyFormat("USD", usd)}</p>
      <p>COP: {currencyFormat("COP", cop)}</p>
    </div>
  );
};

export default PocketsSummary;
