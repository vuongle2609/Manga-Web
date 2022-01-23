import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getPopular } from "../getData";
import MangaCard from "./MangaCard";
import Loading from './Loading'

function HomeSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 3,
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
    <div className="grid wide">
      <div className="row">
        <div className="w-[100%] mb-5">
          <h2 className="mb-3 font-medium text-1xl dark:text-white">
            Đọc nhiều nhất trong ngày
          </h2>
          <Slider {...settings}>
            {props.data.daily.map((manga, index) => (
              <div className="w-full px-1" key={index}>
                <MangaCard
                  title={manga.title}
                  lastChap={manga.lastChap}
                  cover={manga.cover}
                  mangaEP={manga.mangaEP}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

function HomeNewest(props) {
  return props.data ? (
    <div className="grid wide">
      <h2 className="mb-3 font-medium text-1xl dark:text-white">
        Mới cập nhật
      </h2>
      <div className="row">
        {props.data.newUpdate.map((manga, index) => (
          <div className="col s-6 m-2-4 c-2" key={index}>
            <MangaCard
              title={manga.title}
              lastChap={manga.lastChap}
              cover={manga.cover}
              mangaEP={manga.mangaEP}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
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
    <>
      <HomeSlider data={data} />
      <HomeNewest data={data} />
    </>
  );
}
