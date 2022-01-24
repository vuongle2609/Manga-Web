import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getList } from "../getData";
import MangaCard from "./MangaCard";
import Loading from "./Loading";

function Mangas({ data }) {
  return (
    <>
      <div className="col s-6 c-2">
        <div className="w-full">
          <MangaCard
            mangaEP={data.mangaEP}
            cover={data.cover}
            title={data.title}
          />
        </div>
      </div>
    </>
  );
}

function PageBtn({ index, ep, currpage, totalPages }) {
  let button;

  if (index === Number(currpage) + 1 && index < totalPages - 2) {
    button = (
      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-slights dark:bg-sdarks dark:text-white text-sm font-medium text-gray-700">
        ...
      </span>
    );
  } else if (
    (index > Number(currpage) && index < totalPages - 1) ||
    index < Number(currpage) - 2
  ) {
    button = false;
  } else {
    button = (
      <Link
        key={index}
        to={`/list?list=true${ep}`}
        aria-current="page"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        className={
          "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium " +
          (index === Number(currpage) - 1
            ? " bg-primary text-white"
            : " bg-slights dark:bg-sdarks dark:text-white border-gray-300 text-gray-500 hover:bg-gray-50")
        }
      >
        {index + 1}
      </Link>
    );
  }

  return button;
}

function Paginations({ data, currpage }) {
  const totalPages = data.totalPages;

  const arrPages = [];

  const handleArrPages = () => {
    for (let i = 1; i <= totalPages; i++) {
      arrPages.push(`&page=${i}`);
    }
  };

  handleArrPages();

  return (
    <div className="px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex items-center justify-center">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Link
              to={`/list?list=true&page=1`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border dark:text-white border-gray-300 bg-slights dark:bg-sdarks text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <i class="bx bxs-chevrons-left"></i>
            </Link>

            {arrPages.map((ep, index) => (
              <PageBtn
                ep={ep}
                currpage={currpage}
                index={index}
                totalPages={totalPages}
              />
            ))}

            <Link
              to={`/list?list=true&page=${totalPages}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border dark:text-white border-gray-300 bg-slights dark:bg-sdarks text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <i class="bx bxs-chevrons-right"></i>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function ListManga() {
  const [data, setData] = useState(false);

  let location = useLocation();
  let query = new URLSearchParams(location.search);

  const list = query.get("list");
  const genre = query.get("genre");
  const status = query.get("status");
  const sort = query.get("sort");
  const page = query.get("page");

  let filter = {
    list,
    genre,
    status,
    sort,
    page,
  };

  useEffect(() => {
    setData(false);
    getList(filter).then((data) => setData(data));
  }, [location]);

  return (
    <div className="grid wide">
      <div className="row">
        {data ? (
          data.mangas.map((manga, i) => <Mangas key={i} data={manga} />)
        ) : (
          <Loading />
        )}
      </div>
      <div className="row">
        <div className="col c-12">
          {data ? <Paginations data={data} currpage={page} /> : false}
        </div>
      </div>
    </div>
  );
}
