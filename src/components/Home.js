import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getPopular } from "../getData";
import { MangaCardAIO, MangaCardDetail, MangaCardBigDetail } from "./MangaCard";
import Loading from "./Loading";
import { Link } from "react-router-dom";

function importAll(r) {
  return r.keys().map(r);
}

const imagesRec = importAll(require.context('../img/rec', false, /\.(png|jpe?g|svg)$/));

function HomeSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 6,
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
    <div className="row no-gutters">
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
          <i className="bx bx-right-arrow-alt font-medium dark:text-white text-3xl"></i>
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
          <i className="bx bx-right-arrow-alt font-medium dark:text-white text-3xl"></i>
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
  ) : (
    false
  );
}

const HomeRecommend = (props) => {
  const mangasRecommended = [
    {
      title: "Attack On Titan",
      detail: "Hơn 100 năm trước, giống người khổng lồ Titan đã tấn công và đẩy loài người tới bờ vực tuyệt chủng. Những con người sống sót tụ tập lại, xây bao quanh mình 1 tòa thành 3 lớp kiên cố và tự nhốt mình bên trong để trốn tránh những cuộc tấn công của người khổng lồ. Họ tìm mọi cách để tiêu diệt người khổng lồ nhưng không thành công. Và sau 1 thế kỉ hòa bình, giống khổng lồ đã xuất hiện trở lại, một lần nữa đe dọa sự tồn vong của con người....  Elen và Mikasa phải chứng kiến một cảnh tượng cực kinh khủng - mẹ của mình bị ăn thịt ngay trước mắt. Elen thề rằng cậu sẽ giết tất cả những tên khổng lồ mà cậu gặp.....",
      cover: imagesRec[0],
      mangaEP: "attack-on-titan"
    },
    {
      title: "Kishuku Gakkou no Alice",
      detail: "Bối cảnh diễn ra tại trường nội trú Dahlia Academy ở đảo Dahlia. Inuzuka Romio - thủ lĩnh nhà Hắc Khuyển Black Doggie của học sinh Touwa Quốc - có tình cảm từ bé với Juliet Persia - thủ lĩnh nhà Bạch Miêu White Cats của học sinh Công Quốc West. Ban đầu do dự, nhưng Romio cũng quyết định tỏ tình và muốn cùng Juliet thay đổi thế giới. Juliet, bị ấn tượng bởi quyết tâm của Romio, cô chấp nhận tình yêu của anh. Tuy nhiên vì sự thù địch của hai nước, cả Romio và Juliet đều phải nỗ lực để giữ bí mật mối quan hệ của họ với những người bạn cùng ký túc xá khác, cũng như phải cùng nhau thay đổi từ ngôi trường đến thế giới, không chỉ cho tình yêu của hai người, mà còn cho cả mối quan hệ của hai quốc gia.",
      cover: imagesRec[1],
      mangaEP: "kishuku-gakkou-no-alice"
    },
    {
      title: "One Punch-Man",
      detail: "Onepunch-Man là một Manga thể loại siêu anh hùng với đặc trưng phồng tôm đấm phát chết luôn… Lol!!! Nhân vật chính trong Onepunch-man là Saitama, một con người mà nhìn đâu cũng thấy “tầm thường”, từ khuôn mặt vô hồn, cái đầu trọc lóc, cho tới thể hình long tong. Tuy nhiên, con người nhìn thì tầm thường này lại chuyên giải quyết những vấn đề hết sức bất thường. Anh thực chất chính là một siêu anh hùng luôn tìm kiếm cho mình một đối thủ mạnh. Vấn đề là, cứ mỗi lần bắt gặp một đối thủ tiềm năng, thì đối thủ nào cũng như đối thủ nào, chỉ ăn một đấm của anh là… chết luôn. Liệu rằng Onepunch-Man Saitaman có thể tìm được cho mình một kẻ ác dữ dằn đủ sức đấu với anh? Hãy theo bước Saitama trên con đường một đấm tìm đối cực kỳ hài hước của anh!!",
      cover: imagesRec[2],
      mangaEP: "onepunch-man"
    },
  ]

  return props.data ? (
    <>
      <div className="mb-3 flex justify-between">
        <h2 className=" font-medium dark:text-white text-xl">Đề xuất</h2>
      </div>
      <div className="row justify-center">
        {mangasRecommended.map((manga, index) => (
          <div className="col c-4 s-12 rm-6" key={index}>
            <MangaCardBigDetail manga={manga} />
          </div>
        ))}
      </div>
    </>
  ) : <Loading />
}

export default function Home() {
  const [data, setData] = useState(false);

  useEffect(() => {
    getPopular().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="grid wide">
      <HomeSlider data={data} />
      <div className="row md:mt-8">
        <div className="col c-12">
          <HomeNewest data={data} />
        </div>
        <div className="col c-12 mt-6">
          <HomeRecommend data={data} />
        </div>
        <div className="col c-12 mt-6">
          <HomeNewManga data={data} />
        </div>
      </div>
    </div>
  );
}
