import React from "react";
import useStore from "../state";

const CoverModal = () => {
  const { setCover, bigCover } = useStore();

  return bigCover ? (
    <div
      onClick={() => setCover(false)}
      className="fixed top-0 bottom-0 left-0 right-0 bg-modalw dark:bg-modal z-[99999]
    flex items-center justify-center  duration-150 opacity-ani"
    >
      <div
        style={{ backgroundImage: `url(${bigCover})` }}
        className="w-full mx-9 md:mx-40 lg:mx-[700px] pt-[120%] rounded-md bg-contain bg-center bg-no-repeat"
      ></div>
    </div>
  ) : (
    false
  );
};

export default CoverModal;
