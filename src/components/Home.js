import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getPopular } from "../getData";
import {MangaCardAIO, MangaCardDetail} from "./MangaCard";
import Loading from "./Loading";
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
          slidesToScroll: 4,
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
      <div className="col c-12 mb-2">
        <h2 className="mb-3 font-medium dark:text-white lg:text-xl">Nổi bật</h2>
        <Slider {...settings}>
          {props.data.daily.map((manga, index) => (
            <div className="w-full px-1" key={index}>
              <MangaCardAIO
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
      <div className="mb-3 flex justify-between">
        <h2 className=" font-medium dark:text-white text-xl">Mới cập nhật</h2>
        <Link to="/list?sort=2">
          <i class="bx bx-right-arrow-alt font-medium dark:text-white text-3xl"></i>
        </Link>
      </div>
      <div className="row">
        {props.data.newUpdate.map((manga, index) => (
          <div
            className={
              "col " +
              (index > 5 ? " s-0" : " s-12") +
              (index > 11 ? " rm-0" : " rm-6") +
              (index > 11 ? " c-0" : " c-4")
            }
            key={index}
          >
            <MangaCardDetail manga={manga} />
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

function HomeNewManga(props) {
  return props.data ? (
    <>
      <div className="mb-3 flex justify-between">
        <h2 className=" font-medium dark:text-white text-xl">Truyện mới</h2>
        <Link to="/list?sort=3">
          <i class="bx bx-right-arrow-alt font-medium dark:text-white text-3xl"></i>
        </Link>
      </div>
      <div className="row nowrap overflow-hidden">
        {props.data.newManga.map((manga, index) => (
          <div className="col c-2 rm-2-4 s-4" key={index}>
            <MangaCardAIO 
          title={manga.title}
          lastChap={manga.lastChap}
          cover={manga.cover}
          slider={true}
          mangaEP={manga.mangaEP}
          />
          </div>
        ))}
      </div>
    </>
  ) : false;
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
      <div className="row md:mt-8">
        <div className="col c-12">
          <HomeNewest data={data} />
        </div>
        <div className="col c-12">
          <HomeNewManga data={data}/>
        </div>
      </div>
    </div>
  );
}
