import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPages } from "../getData";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import LazyLoad from "react-lazyload";

function ChapNav({ data, mangaEP }) {
  const [chaplist, setChaplist] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".choosen").scrollIntoView({
        block: "nearest",
      });
    }, 300);

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
        className="hover:cursor-pointer bg-white dark:bg-bdark h-6 rounded-md w-full
        dark:text-white justify-between pl-3 pr-7 select-none relative flex"
        onClick={() => {
          setChaplist(!chaplist);
        }}
      >
        <span className="w-full block overflow-hidden whitespace-nowrap text-ellipsis">
          {data.currentChapter}
        </span>
        <i className="bx bxs-chevron-down absolute top-1/2 -translate-y-1/2 right-1"></i>
      </div>

      <div
        className={
          "chap-choose  absolute w-full bg-white dark:bg-bdark left-0 top-8 rounded-md py-2 duration-150 origin-top-right" +
          (chaplist ? " scale-100" : " scale-0")
        }
      >
        <div className="chap-choose chap-choose-scroll flex flex-col-reverse h-fit max-h-60 overflow-scroll scrollbar-cus overflow-x-hidden">
          {data.chapterList.map((chap, index) => (
            <Link key={index} to={`/read?name=${mangaEP}&chap=${chap.chapEP}`}>
              <span
                className={
                  "chap-choose h-6 flex items-center px-3 w-full active:text-primary active:dark:text-primary select-none hover:cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis " +
                  (chap.chapter === data.currentChapter
                    ? " text-primary choosen"
                    : " dark:text-white")
                }
              >
                {chap.chapter}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function Navbar({ data, mangaEP }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        let st = window.pageYOffset || document.documentElement.scrollTop;
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

  let prevLink;

  if (data.prevChapter.length !== 0) {
    prevLink = `/read?name=${mangaEP}&chap=${data.prevChapter}`;
  } else {
    prevLink = `/manga?name=${mangaEP}`;
  }

  let nextLink;

  if (data.nextChapter.length !== 0) {
    nextLink = `/read?name=${mangaEP}&chap=${data.nextChapter}`;
  } else {
    nextLink = `/manga?name=${mangaEP}`;
  }

  return (
    <div
      className={
        "nav-m w-full h-12 bg-slights dark:bg-sdarks sticky transition-all duration-150 flex items-center left-0 right-0" +
        (hide ? " -top-14" : " top-0")
      }
    >
      <div className="grid wide">
        <div className="row">
          <div className="col c-12">
            <div className="flex items-center justify-center w-full">
              <Link to={`/home`} className="flex items-center rounded-md">
                <i className="hover:cursor-pointer px-1 bx bxs-home text-2xl dark:text-white text-black"></i>
              </Link>
              <Link to={prevLink}>
                <i className="prev-chap hover:cursor-pointer px-1 bx bx-chevron-left text-4xl dark:text-white text-black"></i>
              </Link>
              <div className="relative w-7/12">
                <ChapNav data={data} mangaEP={mangaEP} />
              </div>
              <Link to={nextLink}>
                <i className="next-chap hover:cursor-pointer px-1 bx bx-chevron-right text-4xl dark:text-white text-black"></i>
              </Link>
              <Link
                to={`/manga?name=${mangaEP}`}
                className="rounded-md flex items-center"
              >
                <i className="hover:cursor-pointer px-1 bx bxs-book-alt text-2xl dark:text-white text-black"></i>
              </Link>
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

    const handleChap = (e) => {
      if (e.code === "ArrowRight") {
        document.querySelector(".next-chap").click();
      } else if (e.code === "ArrowLeft") {
        document.querySelector(".prev-chap").click();
      }
    };

    document.addEventListener("keydown", (e) => handleChap(e));

    return document.removeEventListener("keydown", (e) => handleChap(e));
  }, [location]);

  return data ? (
    <>
      <Navbar data={data} mangaEP={mangaEP} />
      <div className="grid wide no-p">
        <div className="row">
          <div className="col c-12"></div>
          <div className="col c-12">
            {data.pages.map((page, index) => (
              <LazyLoad key={index} height={300}>
                <img
                  src={page}
                  alt={`trang ${index}`}
                  className="w-full md:px-20 lg:px-44"
                />
              </LazyLoad>
            ))}
          </div>
          <div className="col c-12">
            <div className="w-full flex justify-center mt-3">
              {data.prevChapter.length !== 0 ? (
                <Link
                  to={`/read?name=${mangaEP}&chap=${data.prevChapter}`}
                  className="w-30 px-4 py-2 bg-primary rounded-md text-white mr-2 select-none"
                >
                  Chap trước
                </Link>
              ) : (
                false
              )}
              {data.nextChapter.length !== 0 ? (
                <Link
                  to={`/read?name=${mangaEP}&chap=${data.nextChapter}`}
                  className="w-30 px-4 py-2 bg-primary rounded-md text-white ml-2 select-none"
                >
                  Chap sau
                </Link>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}
