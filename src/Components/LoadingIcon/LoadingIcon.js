import React from "react";
import { Oval } from "react-loading-icons";
const LoadingIcon = () => {
  return (
    <div>
      <Oval stroke="white" strokeOpacity={1} speed={0.75} strokeWidth={5} />
    </div>
  );
};

export default LoadingIcon;
