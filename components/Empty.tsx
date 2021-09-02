import { FunctionComponent } from "react";
import { HiShieldExclamation } from "react-icons/hi";
export interface EmptyProps {}

const Empty: FunctionComponent<EmptyProps> = () => {
  return (
    <div className="rounded-md border-yellow-500 border w-full bg-yellow-100 p-3">
      <h2 className="text-gray-700 font-bold flex flex-row items-center gap-3">
        <HiShieldExclamation />
        Opps...
      </h2>
      <p className="text-gray-600">There is no content to show.</p>
    </div>
  );
};

export default Empty;
