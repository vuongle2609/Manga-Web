import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getPopular } from "../getData";
import MangaCard from "./MangaCard";
import Loading from "./Loading";
import { timeHandle } from "../getData";
import { Link } from "react-router-dom";

function HomeSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
    ],
  };
  return props.data ? (
    <div className="row">
      <div className="w-[100%] mb-2">
        <h2 className="mb-3 font-medium dark:text-white lg:text-xl">Nổi bật</h2>
        <Slider {...settings}>
          {props.data.daily.map((manga, index) => (
            <div className="w-full px-1" key={index}>
              <MangaCard
                title={manga.title}
                lastChap={manga.lastChap}
                cover={manga.cover}
                slider={true}
                mangaEP={manga.mangaEP}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

function HomeNewest(props) {
  return props.data ? (
    <>
      <h2 className="mb-3 font-medium dark:text-white lg:text-xl">
        Mới cập nhật
      </h2>
      <div className="row">
        {props.data.newUpdate.map((manga, index) => (
          <div className="col s-6 m-2-4 c-2-4" key={index}>
            <MangaCard
              title={manga.title}
              lastChap={manga.lastChap}
              cover={manga.cover}
              mangaEP={manga.mangaEP}
            />
          </div>
        ))}
        <div className="col s-6 m-2-4 c-2-4">
          <div className="w-full mb-3">
            <Link to={`/`}>
              <div className="pt-[142.5%] bg-cover rounded-md relative shadow-sm shadow-black bg-bdark dark:bg-slights">
                <div className="absolute top-[46%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 flex flex-col align-center justify-center">
                <i className='text-center bx bx-right-arrow-circle text-white text-5xl'></i>
                  <h4
                    className="font-semibold text-white 
                    font-md w-fit px-[10px] text-[18px] whitespace-nowrap"
                  >
                    Xem thêm
                  </h4>
                </div>
                <span className="absolute w-full h-full bottom-0 left-0 bg-slate-900 opacity-50"></span>
                <span className="absolute w-[86%] h-[86%] top-[50%] left-[50%] translate-x-[-50%]
                 translate-y-[-50%] border-white border-2 rounded-md"></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

function HomeHistory() {
  const [data, setData] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem("manga-history");

    if (history) {
      setData(JSON.parse(localStorage.getItem("manga-history")));
    }
  }, []);

  return (
    <>
      {data ? (
        <>
          <h2 className="mb-3 font-medium dark:text-white lg:text-xl">
            Lịch sử đọc
          </h2>
          {data.map((item, index) => {
            if (index < 6) {
              return (
                <Link
                  to={`/manga?name=${item.mangaEP}`}
                  className="flex w-full mb-3 scale-100 hover:scale-105 duration-150 dark:text-white lg:ml-3"
                  key={index}
                >
                  <div
                    style={{ backgroundImage: `url("${item.cover}")` }}
                    className="lg:w-[30%] lg:pt-[40%] w-[20%] pt-[30%] bg-cover rounded-sm"
                  ></div>
                  <div className="flex-1 ml-3">
                    <h3 className="text-lg leading-6 font-medium line-clamp-3">
                      {item.title}
                    </h3>
                    <p className="text-xs select-none">
                      {timeHandle(item.time)}
                    </p>
                  </div>
                </Link>
              );
            }
          })}
          <Link
            to={"/"}
            className="text-xl dark:text-white w-full text-center block hover:brightness-50 font-medium"
          >
            Xem Thêm...
          </Link>
        </>
      ) : (
        false
      )}
    </>
  );
}

export default function Home() {
  const [data, setData] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("homeData")) {
      getPopular().then((data) => {
        localStorage.setItem("homeData", JSON.stringify(data));
        setData(data);
      });
    } else {
      setData(JSON.parse(localStorage.getItem("homeData")));
    }
  }, []);
  return (
    <div className="grid wide">
      <HomeSlider data={data} />
      <div className="row">
        <div className="col c-9 s-12">
          <HomeNewest data={data} />
        </div>
        <div className="col c-3 s-12">
          <HomeHistory />
        </div>
      </div>
    </div>
  );
}
