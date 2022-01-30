import { useState } from "react";

export default function ToTop() {
  const [display, setDisplay] = useState(false);

  window.onscroll = () => {
    setDisplay(window.scrollY > window.innerHeight);
  };

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={
        "fixed bottom-4 right-4 h-10 w-10 z-50 bg-slights dark:bg-sdarks rounded-md flex items-center justify-center dark:text-white font-medium text-2xl duration-150" +
        (display ? " scale-100" : " scale-0") +
        " lg:h-13 w-13 hover:cursor-pointer"
      }
      onClick={scroll}
    >
      <i className="bx bx-chevron-up lg:text-2xl"></i>
    </div>
  );
}
