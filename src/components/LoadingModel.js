import React from "react";
import { SpinStretch } from "react-cssfx-loading";
import useStore from "../state";

const LoadingModel = () => {
  const { isDark, load } = useStore();
  return load ? (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-modalw dark:bg-modal z-[99999]
    flex items-center justify-center  duration-150 opacity-ani"
    >
      <SpinStretch
        color={isDark === "light" ? "black" : "white"}
        width="60px"
        height="60px"
        duration="2s"
      />
    </div>
  ) : (
    false
  );
};

export default LoadingModel;
