import { FunctionComponent } from "react";
import { FaCircleNotch } from "react-icons/fa";
interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <>
      <FaCircleNotch className="animate-spin text-5xl text-gray-400" />
    </>
  );
};

export default Loading;
