import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../state";
import { getSearch } from "../getData";
import { MangaCardAIO } from "./MangaCard";

function ModalSearch({ setSearch }) {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState(false);

  useEffect(() => {
    document.querySelector(".search").focus();
    document.querySelector(".search-c").classList.remove("scale-0");
    document.querySelector(".search-c").classList.add("scale-100");

    getSearch({ keyword }).then(setData);
  }, [keyword]);

  return (
    <div
      className="search-c bg-white dark:bg-bdark lg:h-fit lg:max-h-[95%] lg:w-8/12 fixed top-0 right-0 left-0 
    bottom-0 lg:relative p-5 lg:rounded-md lg:flex flex-col items-center justify-center transition-all
    scale-0 duration-100 origin-center z-51 overflow-scroll overflow-x-hidden lg:overflow-y-hidden"
    >
      <div className="w-full dark:text-white flex justify-between items-center">
        <h2 className=" font-medium text-2xl mb-4">Tìm kiếm</h2>
        <i className="bx bx-x text-3xl" onClick={setSearch}></i>
      </div>
      <input
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
        className="search h-10 w-full rounded-md bg-gray-200 dark:bg-gray-600 pl-3
          flex justify-start items-center relative cursor-text dark:text-white outline-none focus:outline-orange-400"
      />
      {data ? (
        <>
          <div className="w-full mt-5 dark:text-white flex justify-between items-center">
            <h2 className="text-xl mb-2">
              {data.mangas.length > 0 ? "Kết quả" : "Không tìm thấy"}
            </h2>
            {/* <i
              className="bx bx-right-arrow-alt text-3xl"
              onClick={setSearch}
            ></i> */}
          </div>
          <div className="row w-full flex-1 overflow-scroll scrollbar-cus overflow-x-hidden overflow-y-hidden lg:overflow-y-auto">
            {data.mangas.map((data, index) => (
              <div className="col s-6 c-2-4" key={index} onClick={setSearch}>
                <MangaCardAIO
                  mangaEP={data.mangaEP}
                  cover={data.cover}
                  title={data.title}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        false
      )}
    </div>
  );
}

function ModalGenres() {
  const { setGenres, setCanvas } = store();
  const genresList = [
    {
      genre: "Action",
      EP: "action",
    },
    {
      genre: "Adult",
      EP: "adult",
    },
    {
      genre: "Adventure",
      EP: "adventure",
    },
    {
      genre: "Anime",
      EP: "anime",
    },
    {
      genre: "Chuyển Sinh",
      EP: "chuyen-sinh",
    },
    {
      genre: "Cổ Đại",
      EP: "co-dai",
    },
    {
      genre: "Comedy",
      EP: "comedy",
    },
    {
      genre: "Comic",
      EP: "comic",
    },
    {
      genre: "Demons",
      EP: "demons",
    },
    {
      genre: "Detective",
      EP: "detective",
    },
    {
      genre: "Doujinshi",
      EP: "doujinshi",
    },
    {
      genre: "Drama",
      EP: "drama",
    },
    {
      genre: "Đam Mỹ",
      EP: "dam-my",
    },
    {
      genre: "Ecchi",
      EP: "ecchi",
    },
    {
      genre: "Fantasy",
      EP: "fantasy",
    },
    {
      genre: "Gender Bender",
      EP: "gender-bender",
    },
    {
      genre: "Harem",
      EP: "harem",
    },
    {
      genre: "Historical",
      EP: "historical",
    },
    {
      genre: "Horror",
      EP: "horror",
    },
    {
      genre: "Huyền Huyễn",
      EP: "huyen-huyen",
    },
    {
      genre: "Isekai",
      EP: "isekai",
    },
    {
      genre: "Josei",
      EP: "josei",
    },
    {
      genre: "Mafia",
      EP: "mafia",
    },
    {
      genre: "Magic",
      EP: "magic",
    },
    {
      genre: "Manhua",
      EP: "manhua",
    },
    {
      genre: "Manhwa",
      EP: "manhwa",
    },
    {
      genre: "Martial Arts",
      EP: "martial-arts",
    },
    {
      genre: "Mature",
      EP: "mature",
    },
    {
      genre: "Military",
      EP: "military",
    },
    {
      genre: "Mystery",
      EP: "mystery",
    },
    {
      genre: "Ngôn Tình",
      EP: "ngon-tinh",
    },
    {
      genre: "One shot",
      EP: "one-shot",
    },
    {
      genre: "Psychological",
      EP: "psychological",
    },
    {
      genre: "Romance",
      EP: "romance",
    },
    {
      genre: "School Life",
      EP: "school-life",
    },
    {
      genre: "Sci-fi",
      EP: "sci-fi",
    },
    {
      genre: "Seinen",
      EP: "seinen",
    },
    {
      genre: "Shoujo",
      EP: "shoujo",
    },
    {
      genre: "Shoujo Ai",
      EP: "shoujo-ai",
    },
    {
      genre: "Shounen",
      EP: "shounen",
    },
    {
      genre: "Shounen Ai",
      EP: "shounen-ai",
    },
    {
      genre: "Slice of life",
      EP: "slice-of-life",
    },
    {
      genre: "Smut",
      EP: "smut",
    },
    {
      genre: "Sports",
      EP: "sports",
    },
    {
      genre: "Supernatural",
      EP: "supernatural",
    },
    {
      genre: "Tragedy",
      EP: "tragedy",
    },
    {
      genre: "Trọng Sinh",
      EP: "trong-sinh",
    },
    {
      genre: "Truyện Màu",
      EP: "truyen-mau",
    },
    {
      genre: "Webtoon",
      EP: "webtoon",
    },
    {
      genre: "Xuyên Không",
      EP: "xuyen-khong",
    },
    {
      genre: "Yaoi",
      EP: "yaoi",
    },
    {
      genre: "Yuri",
      EP: "yuri",
    },
    {
      genre: "Mecha",
      EP: "mecha",
    },
    {
      genre: "Cooking",
      EP: "cooking",
    },
    {
      genre: "Trùng Sinh",
      EP: "trung-sinh",
    },
    {
      genre: "Gourmet",
      EP: "gourmet",
    },
  ];

  return (
    <div className="bg-white dark:bg-bdark h-fit w-10/12 lg:w-7/12 self-center py-5 px-3 rounded-sm">
      <div className="w-11/12">
        <h2 className="dark:text-white font-medium text-2xl mb-4">Thể loại</h2>
      </div>
      <div className=" w-full h-[400px] rounded-sm overflow-scroll overflow-x-hidden scrollbar-cus row">
        {genresList.map((genre, index) => (
          <Link
            key={index}
            to={`/genres?genre=${genre.EP}`}
            onClick={() => {
              setGenres();
              setCanvas();
            }}
            className="h-6 flex items-center px-3 mb-2 col s-6 c-2 font-medium active:text-primary active:dark:text-primary select-none hover:cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:text-white"
          >
            {genre.genre}
          </Link>
        ))}
      </div>
    </div>
  );
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
    content = <ModalSearch setSearch={setSearch} />;
  } else if (isGenres) {
    content = <ModalGenres />;
  }

  return isSearch || isGenres ? (
    <>
      <div
        className="modal fixed top-0 bottom-0 left-0 right-0 bg-modal flex justify-center items-center z-50 opacity-ani"
        onMouseDown={(e) => handleHide(e)}
      >
        {content}
      </div>
    </>
  ) : (
    false
  );
}
