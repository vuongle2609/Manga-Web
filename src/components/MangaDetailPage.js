import { useLocation } from "react-router-dom";
import { getDetail, handleGenreEP } from "../getData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { timeHandle, updateManga, getUser, deleteManga } from "../getData";
import useStore from "../state";

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

    setTime(timeHandle(data.lastUpdate));
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

function Body({ data, mangaEp, mangaObj }) {
  return (
    <div className="row no-gutters">
      <div className="col c-12 mb-3">
        <ActionZone data={data} mangaEp={mangaEp} mangaObj={mangaObj} />
      </div>
      <div className="col c-12">
        <div className="w-full h-fit bg-white dark:bg-bdark rounded-md px-3 lg:px-3 shadow-md">
          <div className="row py-3 px-2">
            <div className="col c-12">
              <div className="w-full flex flex-wrap">
                {data.genres
                  ? data.genres.map((genre, index) => (
                    <Link
                      key={index}
                      to={`/list?genre=${handleGenreEP(genre)}`}
                      className="text-white bg-sdarks py-[2px] px-[8px] rounded-md mx-[2px] font-bold select-none mb-2 hover:text-primary"
                    >
                      {genre}
                    </Link>
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
              <div className="w-full h-fit max-h-60 lg:max-h-[400px]  overflow-scroll overflow-x-hidden scrollbar-cus px-2">
                {data.chaps.map((chap, index) => (
                  <Link
                    to={`/read?name=${mangaEp}&chap=${chap.chapEP}`}
                    key={index}
                  >
                    <span
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

function ActionBtn({ mangaObj }) {
  const [isFav, setIsFav] = useState(false);
  const { userData, setUserData, setLoad } = useStore();

  useEffect(() => {
    if (userData) {
      if (userData !== "wait") {
        const favArr = userData.readingList;

        let contain = false;
        favArr.filter((m) => {
          if (m.mangaEP === mangaObj.mangaEP) {
            contain = true;
          }
        });

        setIsFav(contain);
      }
    }
  }, [userData]);

  const handleFavourite = async () => {
    setLoad(true);
    const res = await updateManga(mangaObj);
    const newUserData = res.data.user;
    setUserData(newUserData);
    setIsFav(true);
    setLoad(false);
  };

  const handleDeleteFavourite = async () => {
    setLoad(true);
    const res = await deleteManga(mangaObj.mangaEP);
    const newUserData = res.data.user;
    console.log("new", newUserData.readingList);
    setUserData(newUserData);
    setIsFav(false);
    setLoad(false);
  };

  return !isFav ? (
    <div
      className={
        " py-2 rounded-md mx-[2px] mt-2 lg:mt-0 px-5 font-bold  select-none text-center w-fulll transition-all duration-150  flex items-center justify-center whitespace-nowrap cursor-pointer" +
        (isFav
          ? " bg-[#ff7675] text-white"
          : " bg-slights dark:bg-sdarks dark:text-white")
      }
      onClick={handleFavourite}
    >
      Thêm vào bộ sưu tập
    </div>
  ) : (
    <div
      className={
        " py-2 rounded-md mx-[2px] mt-2 lg:mt-0 px-5 font-bold  select-none text-center w-fulll transition-all duration-150  flex items-center justify-center whitespace-nowrap cursor-pointer" +
        (isFav
          ? " bg-[#ff7675] text-white"
          : " bg-slights dark:bg-sdarks dark:text-white")
      }
      onClick={handleDeleteFavourite}
    >
      Xóa khỏi bộ sưu tập
    </div>
  );
}

function ActionLink({ name, path }) {
  return (
    <Link
      to={path}
      className={
        "py-2 px-5 rounded-md mx-[2px] font-bold select-none text-center flex-1 bg-primary text-white flex items-center justify-center whitespace-nowrap"
      }
    >
      {name}
    </Link>
  );
}

function ActionZone({ data, mangaEp, mangaObj }) {
  const [isLogin, setLogin] = useState(false)
  let firstChap;
  let lastChap;
  const { userData } = useStore()
  useEffect(() => {
    if (userData && userData !== "wait") {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [userData])

  const chapArr = data.chaps;
  const chapLength = data.chaps.length;

  firstChap = chapArr[0].chapEP;
  lastChap = chapArr[chapLength - 1].chapEP;

  return (
    <div className="px-2 pt-4 row">
      <div className="col c-12 flex flex-col lg:flex-row">
        <div className="flex">
          <ActionLink
            name="Đọc từ đầu"
            path={`/read?name=${mangaEp}&chap=${firstChap}`}
          />
          <ActionLink
            name="Chap mới nhất"
            path={`/read?name=${mangaEp}&chap=${lastChap}`}
          />
        </div>
        {isLogin ?
          <ActionBtn mangaObj={mangaObj} /> :
          (
            <Link
              className={
                " py-2 rounded-md mx-[2px] mt-2 lg:mt-0 px-5 font-bold  select-none text-center w-fulll transition-all duration-150  flex items-center justify-center whitespace-nowrap cursor-pointer" +
                " bg-textDarkGray text-white"
              }
              to="/login"
            >
              Đăng nhập ngay để lưu

            </Link>
          )
        }
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
    window.scrollTo(0, 0);
    setData(false);
    getDetail(mangaEP).then(setData);
  }, [location]);

  const mangaObj = {
    title: data.title,
    cover: data.cover,
    mangaEP,
    time: new Date(),
    genres: data.genres,
    view: data.view,
    rating: data.rating,
    status: data.status,
  };

  const handleHistory = () => {
    if (!localStorage.getItem("manga-history")) {
      const a = [mangaObj];
      localStorage.setItem("manga-history", JSON.stringify(a));
    } else {
      const b = JSON.parse(localStorage.getItem("manga-history"));

      const c = b.filter((manga) => {
        if (data.title !== manga.title) {
          return manga;
        }
      });

      c.unshift(mangaObj);
      localStorage.setItem("manga-history", JSON.stringify(c));
    }
  };

  if (data) handleHistory();

  return data ? (
    <div className="relative min-h-screen w-full">
      <div
        className="h-screen w-full blur absolute top-0 left-0 z-[0] bg-cover"
        style={{ backgroundImage: `url('${data.cover}')` }}
      ></div>
      <div className="h-screen w-full blur absolute top-0 left-0 z-[2] bg-gradient-to-t from-transparent to-modalw dark:to-modal"></div>
      <div className="grid wide z-10 relative">
        <Header data={data} />
        <Body data={data} mangaEp={mangaEP} mangaObj={mangaObj} />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
