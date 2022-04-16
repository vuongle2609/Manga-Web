import React from "react";
import useStore from "../state";
import { Link } from "react-router-dom";
import { MangaCardAIO } from "./MangaCard";
import { timeHandle } from "../getData";

const User = () => {
  const { userData, setConfirmOut } = useStore();
  const time = timeHandle(userData.createdAt);

  return (
    <div className="grid wide">
      <div className="row">
        <div className="col c-12 ">
          <div className="w-full flex py-4 md:py-5 md:px-4 lg:py-8 lg:px-4 bg-white dark:bg-sdarks rounded-md px-2">
            <div
              className="w-24 h-24 min-h-24 md:w-32 md:h-32 bg-center bg-cover rounded-full"
              style={{ backgroundImage: `url(${userData.avatar})` }}
            ></div>
            <div className="px-2 md:ml-4 dark:text-white flex-1 flex flex-col">
              <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
                {userData.name}
              </h2>
              <span className="block md:text-base">Tham gia: {time}</span>
              <span className="block mb-2 md:text-base">
                Vai trò: {userData.role}
              </span>
              <div className="flex flex-wrap mt-auto">
                <Link
                  to="/favourite"
                  className="bg-[#ff7675] pr-2 md:pl-8 mt-2 pl-6 py-1 rounded-md flex relative mr-2 text-white cursor-pointer"
                >
                  <i
                    className="md:text-xl bx bxs-heart absolute left-2 top-[53%] md:top-[51%]
                    translate-y-[-50%]"
                  ></i>
                  <span className="md:text-base">Bộ sưu tập</span>
                </Link>
                <Link
                  to="/userinfo"
                  className="bg-textDarkGray pr-2 md:pl-8 mt-2 pl-6 py-1 rounded-md flex relative text-white mr-2 cursor-pointer"
                >
                  <i
                    className="md:text-xl bx bxs-cog absolute left-2 top-[53%] md:top-[51%]
                    translate-y-[-50%]"
                  ></i>
                  <span className="md:text-base">Cài đặt</span>
                </Link>
                <div
                  onClick={() => setConfirmOut(true)}
                  className="bg-red-500 pr-2 md:pl-8 mt-2 pl-6 py-1 rounded-md flex relative text-white cursor-pointer"
                >
                  <i
                    className="md:text-xl bx bx-log-out absolute left-2 top-[53%] md:top-[51%]
                    translate-y-[-50%]"
                  ></i>
                  <span className="md:text-base">Đăng Xuất</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col c-12">
          <div className="w-full flex py-2 bg-white dark:bg-sdarks rounded-md px-2 mt-4 flex-col">
            <h1 className="text-lg dark:text-white font-bold mx-2">
              Đã lưu gần đây
            </h1>
            <div className="row no-gutters w-full mt-3 justify-center md:justify-start">
              {userData &&
              userData !== "wait" &&
              userData.readingList.length !== 0 ? (
                userData.readingList.map((manga, index) => {
                  if (index < 6) {
                    return (
                      <div className="col s-6 rm-3 c-2" key={index}>
                        <div className="w-full px-2">
                          <MangaCardAIO
                            mangaEP={manga.mangaEP}
                            cover={manga.cover}
                            title={manga.title}
                          />
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="">
                  <span className="dark:text-white mb-2 block">
                    Bạn chưa lưu gì cả
                  </span>
                  <Link
                    to="/home"
                    className="block bg-primary px-2 py-1 text-white rounded-md mb-2"
                  >
                    Đọc truyện nào!!
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col c-12">
          <div className="w-full flex py-2 bg-white dark:bg-sdarks rounded-md px-2 mt-4 flex-col">
            <h1 className="text-lg dark:text-white font-bold mx-2">
              Đã xem gần đây
            </h1>
            <div className="row no-gutters w-full mt-3 justify-center md:justify-start">
              {userData &&
              userData !== "wait" &&
              userData.historyList.length !== 0
                ? userData.historyList.map((manga, index) => {
                    if (index < 6) {
                      return (
                        <div className="col s-6 rm-3 c-2" key={index}>
                          <div className="w-full px-2">
                            <MangaCardAIO
                              mangaEP={manga.mangaEP}
                              cover={manga.cover}
                              title={manga.title}
                            />
                          </div>
                        </div>
                      );
                    }
                  })
                : false}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
