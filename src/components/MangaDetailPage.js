import { useLocation } from "react-router-dom";
import { getDetail } from "../getData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";

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
          <h3 className="title-detail dark:text-white font-bold text-3xl leading-8 lg:text-7xl">
            {data.title}
          </h3>
          <h4 className="mt-1 dark:text-white font-xl font-medium lg:text-3xl">
            {typeof data.author !== "string"
              ? data.author.map(
                  (author, index) =>
                    author + (data.author.length - 1 === index ? "" : ", ")
                )
              : false}
          </h4>
          <div className="mt-auto dark:text-white">
            <span className="mr-2 font-medium text-md lg:text-[20px]">
              <i className="bx text-primary mr-1 bx-star"></i>
              <span className="text-primary">{data.rating}</span>
            </span>
            <span className="mr-2 font-medium text-md lg:text-[20px]">
              <i className="bx mr-1 bx-play"></i>
              <span className="">{data.view}</span>
            </span>
            <span className="mr-2 font-medium text-md lg:text-[20px]">
              <i className="bx mr-1 bx-time-five"></i>
              <span className="">{time}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body({ data, mangaEp }) {
  return (
    <div className="row mt-3">
      <div className="col c-12">
        <div className="w-full h-fit bg-white dark:bg-bdark rounded-sm px-1 lg:px-3 shadow-md">
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
              {typeof data.author !== "string"
                ? data.author.map(
                    (author, index) =>
                      author + (data.author.length - 1 === index ? "" : ", ")
                  )
                : "Chưa được cập nhật"}
            </div>
          </div>

          <div className="py-1 px-2 row">
            <div className="col c-12 dark:text-white">
              <span className="font-bold">Tên khác: </span>
              {data.otherTitle
                ? data.otherTitle.map(
                    (text, index) =>
                      text + (data.otherTitle.length - 1 === index ? "" : ", ")
                  )
                : "Hiện chưa có"}
            </div>
          </div>

          <div className="py-1 px-2 row">
            <div className="col c-12 dark:text-white">
              <span className="font-bold">Trạng thái: </span>
              {data.status}
            </div>
          </div>

          <div className="py-3 px-2 row">
            <div className="col c-12 dark:text-white">
              <span className="font-bold">Danh sách tập: </span>
              <div className="w-full max-h-60 overflow-scroll overflow-x-hidden scrollbar-cus px-2">
                {data.chaps.map((chap, index) => (
                  <Link to={`/read?name=${mangaEp}&chap=${chap.chapEP}`}>
                    <span
                      key={index}
                      className={
                        "flex justify-between p-1 select-none hover:cursor-pointer active:text-primary transition-all duration-75 rounded-sm" +
                        (index % 2 === 0 ? "" : " bg-slights dark:bg-sdarks")
                      }
                    >
                      <h4 className="flex-1">{chap.chapTitle}</h4>
                      <span className="ml-1">{chap.chapTime}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MangaDetailPage() {
  let location = useLocation();
  let query = new URLSearchParams(location.search);

  const [data, setData] = useState(false);

  const mangaEP = query.get("name");

  useEffect(() => {
    window.scrollTo(0, 0)
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
        <Body data={data} mangaEp={mangaEP} />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
