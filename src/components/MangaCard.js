import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { timeHandle } from "../getData";

export const MangaCardAIO = function (props) {
  return (
    <div className="w-full mb-3">
      <Link to={`/manga?name=${props.mangaEP}`}>
        <div
          style={{ backgroundImage: `url('${props.cover}')` }}
          className={
            "pt-[142.5%] bg-cover rounded-md overflow-hidden relative shadow-sm shadow-black dark:shadow-none" +
            (props.slider ? "" : " scale-100 hover:scale-[102%] duration-150")
          }
        >
          <h4
            className="font-semibold line-clamp-2 text-white 
                absolute bottom-3 z-10 font-md w-full px-[10px] text-[14px] 
            "
          >
            {props.title}
          </h4>
          <span className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-b from-transparent to-slate-900"></span>
        </div>
      </Link>
    </div>
  );
}

export const MangaCardDetail = function ({ manga }) {
  return (
    <Link
      to={`/manga?name=${manga.mangaEP}`}
      className="flex w-full mb-3 duration-150 dark:text-white"
    >
      <div
        style={{ backgroundImage: `url("${manga.cover}")` }}
        className="w-[19%] pt-[25%] md:w-[28%] md:pt-[34%] lg:w-[30%] lg:pt-[40%] bg-cover rounded-sm bg-center"
      ></div>
      <div className="flex-1 ml-3 flex flex-col">
        <h3 className="text-lg leading-6 font-medium line-clamp-2 lg:line-clamp-3 lg:text-lg">
          {manga.title}
        </h3>
        <p className="text-xs select-none lg:text-base">
          {timeHandle(manga.time ? manga.time : manga.lastUpdate)}
        </p>
        <p className="text-xs select-none mt-auto line-clamp-1 lg:text-base text-primary">
          {manga.lastChap}
        </p>
      </div>
    </Link>
  );
}

export const MangaCardBigDetail = function ({ manga }) {
  return (
    <Link
      to={`/manga?name=${manga.mangaEP}`}
      className="flex flex-col w-full mb-5 duration-150 dark:text-white"
    >
      <div
        style={{ backgroundImage: `url("${manga.cover}")` }}
        className="w-full pt-[55%] bg-cover rounded-lg bg-center"
      ></div>
      <div className="flex-1 md:px-2 lg:px-5 flex flex-col text-justify">
        <h3 className="text-xl leading-6 font-bold line-clamp-2 lg:line-clamp-3 mt-4">
          {manga.title}
        </h3>
        <p className="text-xs select-none lg:text-base line-clamp-4 dark:text-textDarkGray">
          {manga.detail}
        </p>
      </div>
    </Link>
  );
}
