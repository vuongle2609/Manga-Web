import { useEffect } from "react";
import store from "../state";

function ModalSearch() {
  useEffect(() => {
    document.querySelector(".search").focus();
    document.querySelector(".search-c").classList.remove("scale-0");
    document.querySelector(".search-c").classList.add("scale-100");
  }, []);

  return (
    <div
      className="search-c bg-white dark:bg-bdark h-32 w-11/12 lg:w-8/12
    mt-20 rounded-md flex flex-col items-center justify-center pb-3 transition-all scale-0 duration-100 origin-center z-51
    "
    >
      <div className="w-11/12">
        <h2 className="dark:text-white font-medium text-2xl mb-4">Search</h2>
      </div>
      <input
        type="text"
        className="search h-10 w-11/12 rounded-md bg-gray-200 dark:bg-gray-600 pl-3
            flex justify-start items-center relative cursor-text dark:text-white outline-none focus:outline-orange-400"
      />
    </div>
  );
}

function ModalGenres() {
  return (
    <p>jdhfjksdhf</p>
  )
}

export default function Modal() {
  const { isSearch, setSearch, isGenres, setGenres } = store();

  const handleHide = (e) => {
    if (e.target.classList.contains("modal")) {
      if (isSearch) {
        setSearch();
      } else if (isGenres) {
        setGenres();
      }
    }
  };

  let content;

  if (isSearch) {
    content = <ModalSearch />;
  } else if (isGenres) {
    content = <ModalGenres />;
  }

  return isSearch || isGenres ? (
    <>
      <div
        className="modal fixed top-0 bottom-0 left-0 right-0 bg-modal flex justify-center z-50 opacity-ani"
        onClick={(e) => handleHide(e)}
      >
        {content}
      </div>
    </>
  ) : (
    false
  );
}
