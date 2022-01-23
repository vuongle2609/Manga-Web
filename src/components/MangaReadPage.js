import { useLocation } from "react-router-dom";
import { getDetail } from "../getData";
import { useEffect, useState } from "react";

function Header({ data }) {
  const [time, setTime] = useState(false);

  useEffect(() => {
    const title = document.querySelector(".title-detail");
    if (title.offsetHeight >= 85) {
      title.classList.remove("text-3xl");
      title.classList.remove("leading-8");
      title.classList.add("text-xl");
      title.classList.add("leading-6");
    }
    const timeHandle = (ltime) => {
      const date1 = new Date();
      const date2 = new Date(ltime);
      const dayB = date1.getDate() - date2.getDate();
      const hourB = date1.getHours() - date2.getHours();
      const minuteB = date1.getMinutes() - date2.getMinutes();
      if (dayB === 0) {
        if (hourB === 0) {
          setTime(minuteB + " phút trước");
        } else {
          setTime(hourB + " giờ trước");
        }
      } else {
        setTime(dayB + " ngày trước");
      }
    };

    timeHandle(data.lastUpdate);
  }, []);

  return (
    <div className="row">
      <div className="col s-4 c-3">
        <div className="w-full">
          <div
            className="cover-detail pt-[142.5%] bg-cover rounded-sm"
            style={{ backgroundImage: `url('${data.cover}')` }}
          ></div>
        </div>
      </div>
      <div className="col s-8 c-9">
        <div className="w-full flex-col flex detail min-h-full">
          <h3 className="title-detail dark:text-white font-bold text-3xl leading-8 lg:text-6xl">
            {data.title}
          </h3>
          <h4 className="mt-1 dark:text-white font-xl font-medium">
            {typeof data.author !== "string"
              ? data.author.map(
                  (author, index) =>
                    author + (data.author.length - 1 === index ? "" : ", ")
                )
              : false}
          </h4>
          <div className="mt-auto dark:text-white">
            <span className="mr-2 font-medium text-md">
              <i className="bx text-primary mr-1 bx-star"></i>
              <span className="text-primary">{data.rating}</span>
            </span>
            <span className="mr-2 font-medium text-md">
              <i className="bx mr-1 bx-play"></i>
              <span className="">{data.view}</span>
            </span>
            <span className="mr-2 font-medium text-md">
              <i className="bx mr-1 bx-time-five"></i>
              <span className="">{time}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body({ data }) {
  return (
    <div className="row mt-3">
      <div className="col c-12">
        <div className="w-full h-fit bg-white dark:bg-bdark rounded-sm">
          <div className="row py-3 px-2">
            <div className="col c-12">
              <div className="w-full flex flex-wrap">
                {data.genres
                  ? data.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="text-white bg-sdarks py-[2px] px-[8px] rounded-md mx-[2px] font-bold select-none mb-2"
                      >
                        {genre}
                      </span>
                    ))
                  : false}
              </div>
            </div>
          </div>

          <div className="py-3 px-2 row">
            <div className="col c-12">
              <span className="dark:text-white font-medium">
                <span className="font-bold">Tóm tắt: </span>
                {data.description}
              </span>
            </div>
          </div>

          <div className="py-1 px-2 row">
            <div className="col c-12 dark:text-white">
              <span className="font-bold">Tác giả: </span>
              {data.author}
            </div>
          </div>

          <div className="py-1 px-2 row">
            <div className="col c-12 dark:text-white">
              <span className="font-bold">Tên khác: </span>
              {data.otherTitle.map(
                (text, index) =>
                  text + (data.otherTitle.length - 1 === index ? "" : ", ")
              )}
            </div>
          </div>

          <div className="py-1 px-2 row">
            <div className="col c-12 dark:text-white">
              <span className="font-bold">Trạng thái: </span>
              {data.status}
            </div>
          </div>

          <div className="py-3 px-2 row">
            <div className="col c-12 dark:text-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MangaReadPage() {
  let location = useLocation();
  let query = new URLSearchParams(location.search);

  const [data, setData] = useState(false);

  const mangaEP = query.get("name");

  useEffect(() => {
    getDetail(mangaEP).then(setData);
  }, []);

  return data ? (
    <div className="relative min-h-screen w-full">
      <div
        className="h-screen w-full blur absolute top-0 left-0 z-[0] bg-cover"
        style={{ backgroundImage: `url('${data.cover}')` }}
      ></div>
      <div className="h-screen w-full blur absolute top-0 left-0 z-[2] bg-gradient-to-t from-transparent to-modalw dark:to-modal"></div>
      <div className="grid wide z-10 relative">
        <Header data={data} />
        <Body data={data} />
      </div>
    </div>
  ) : (
    <div className="grid wide">
      <div className="row">
        <div class="bg-white dark:bg-bdark w-full mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
          <div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 dark:bg-sdarks animate-pulse"></div>
          <div class="flex flex-col flex-1 gap-5 sm:p-2">
            <div class="flex flex-1 flex-col gap-3">
              <div class="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-14 rounded-2xl"></div>
              <div class="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-3 rounded-2xl"></div>
              <div class="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-3 rounded-2xl"></div>
              <div class="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-3 rounded-2xl"></div>
              <div class="bg-gray-200 dark:bg-sdarks w-full animate-pulse h-3 rounded-2xl"></div>
            </div>
            <div class="mt-auto flex gap-3">
              <div class="bg-gray-200 dark:bg-sdarks w-20 h-8 animate-pulse rounded-full"></div>
              <div class="bg-gray-200 dark:bg-sdarks w-20 h-8 animate-pulse rounded-full"></div>
              <div class="bg-gray-200 dark:bg-sdarks w-20 h-8 animate-pulse rounded-full ml-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
