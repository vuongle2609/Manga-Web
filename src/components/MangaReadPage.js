import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPages } from "../getData";
import Loading from "./Loading";

function Navbar({ data }) {
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
        "nav-m w-full h-12 bg-red-900 sticky transition-all duration-150 " +
        (hide ? "-top-14" : "top-0")
      }
    ></div>
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
    getPages({ mangaEP, chapterEP }).then(setData);
  }, []);

  return data ? (
    <>
      <Navbar data={data} />
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
