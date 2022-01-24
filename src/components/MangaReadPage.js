import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPages } from "../getData";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function ChapNav({ data, mangaEP }) {
  const [chaplist, setChaplist] = useState(false);

  useEffect(() => {
    const handleHide = (e) => {
      if (!e.target.classList.contains("chap-choose") && chaplist) {
        setChaplist(!chaplist);
      }
    };

    document.addEventListener("click", handleHide);

    return () => {
      document.removeEventListener("click", handleHide);
    };
  }, [chaplist]);
  return (
    <>
      <div
        className="hover:cursor-pointer bg-slights dark:bg-sdarks h-6 rounded-md w-full
        dark:text-white justify-between pl-3 pr-7 select-none relative"
        onClick={() => {
          setChaplist(!chaplist);
        }}
      >
        <span className="w-full block overflow-hidden whitespace-nowrap text-ellipsis">
          {data.currentChapter}
        </span>
        <i class="bx bxs-chevron-down absolute top-1/2 -translate-y-1/2 right-1"></i>
      </div>
      {chaplist ? (
        <div className="chap-choose  absolute w-full bg-white dark:bg-sdarks left-0 top-8 rounded-md py-2">
          <div className="chap-choose flex flex-col-reverse h-fit max-h-60 overflow-scroll scrollbar-cus overflow-x-hidden">
            {data.chapterList.map((chap, index) => (
              <Link
                key={index}
                to={`/read?name=${mangaEP}&chap=${chap.chapEP}`}
              >
                <span
                  className={
                    "chap-choose h-6 flex items-center px-3 w-full active:text-primary active:dark:text-primary select-none hover:cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis " +
                    (chap.chapter === data.currentChapter
                      ? " text-primary"
                      : " dark:text-white")
                  }
                >
                  {chap.chapter}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
}

function Navbar({ data, mangaEP }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    var lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          setHide(true);
        } else {
          setHide(false);
        }
        lastScrollTop = st <= 0 ? 0 : st;
      },
      false
    );
  }, []);
  return (
    <div
      className={
        "nav-m w-full h-12 bg-primary sticky transition-all duration-150 flex items-center left-0 right-0" +
        (hide ? " -top-14" : " top-0")
      }
    >
      <div className="grid wide">
        <div className="row">
          <div className="col c-12">
            <div className="flex items-center justify-center w-full">
              <Link to={`/home`}>
                <i className="hover:cursor-pointer px-1 bx bx-home text-2xl text-white dark:text-black"></i>
              </Link>
              <Link to={`/read?name=${mangaEP}&chap=${data.prevChapter}`}>
                <i className="hover:cursor-pointer px-1 bx bx-chevron-left text-4xl text-white dark:text-black"></i>
              </Link>
              <div className="relative w-7/12">
                <ChapNav data={data} mangaEP={mangaEP} />
              </div>
              <Link to={`/read?name=${mangaEP}&chap=${data.nextChapter}`}>
                <i className="hover:cursor-pointer px-1 bx bx-chevron-right text-4xl text-white dark:text-black"></i>
              </Link>
              <span>
                <i className="hover:cursor-pointer px-1 bx bx-menu text-2xl text-white dark:text-black"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MangaReadPage() {
  let location = useLocation();
  let query = new URLSearchParams(location.search);

  const mangaEP = query.get("name");
  const chapterEP = query.get("chap");

  const [data, setData] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setData(false);
    getPages({ mangaEP, chapterEP }).then(setData);
  }, [location]);

  return data ? (
    <>
      <Navbar data={data} mangaEP={mangaEP} />
      <div className="grid wide">
        <div className="row">
          <div className="col c-12"></div>
          <div className="col c-12">
            {data.pages.map((page, index) => (
              <img key={index} src={page} alt="" className="w-full" />
            ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}
