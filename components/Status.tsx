import { FunctionComponent } from "react";
import { FcCheckmark, FcClock } from "react-icons/fc";
export interface StatusProps {
  status: boolean;
}

const Status: FunctionComponent<StatusProps> = ({ status }) => {
  return (
    <>
      {status && <FcCheckmark className="text-2xl" title="Received" />}
      {!status && <FcClock className="text-2xl" title="Pending..." />}
    </>
  );
};

export default Status;
