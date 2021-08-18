import { FunctionComponent } from "react";

export interface PocketsSummaryProps {
  usd: number;
  cop: number;
}

const PocketsSummary: FunctionComponent<PocketsSummaryProps> = ({
  usd,
  cop,
}) => {
  return (
    <div>
      <p>USD: {usd}</p>
      <p>COP: {cop}</p>
    </div>
  );
};

export default PocketsSummary;
