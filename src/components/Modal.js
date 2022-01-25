import { useEffect } from "react";
import { Link } from "react-router-dom";
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
        <h2 className="dark:text-white font-medium text-2xl mb-4">Tìm kiếm</h2>
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
    <div className="bg-white dark:bg-bdark h-fit w-10/12 self-center py-5 px-3 rounded-sm">
      <div className="w-11/12">
        <h2 className="dark:text-white font-medium text-2xl mb-4">Thể loại</h2>
      </div>
      <div className=" w-full h-[400px] rounded-sm overflow-scroll overflow-x-hidden scrollbar-cus row">
        {genresList.map((genre, index) => (
          <Link
            key={index}
            to={`/list?genre=${genre.EP}`}
            onClick={() => {
              setGenres();
              setCanvas();
            }}
            className="h-6 flex items-center px-3 col c-6 font-medium active:text-primary active:dark:text-primary select-none hover:cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis dark:text-white"
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
