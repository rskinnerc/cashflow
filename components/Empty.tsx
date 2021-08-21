import { FunctionComponent } from "react";

export interface EmptyProps {}

const Empty: FunctionComponent<EmptyProps> = () => {
  return (
    <div>
      <h2 className="text-4xl font-semibold">No Content</h2>
    </div>
  );
};

export default Empty;
