import store from "../state";
import { Link } from "react-router-dom";

function CanvasSections(props) {
  const { setCanvas } = store();
  return props.list ? (
    <li className={"flex items-center justify-start py-2 px-3 dark:text-white"} onClick={props.set}>
      <i className={`bx bx-${props.icon} mr-1 text-2xl`}></i>
      <span className="select-none font-medium">{props.name}</span>
    </li>
  ) : (
    <Link to={props.path} onClick={setCanvas}>
      <li
        className={"flex items-center justify-start py-2 px-3 dark:text-white"}
      >
        <i className={`bx bx-${props.icon} mr-1 text-2xl`}></i>
        <span className="select-none font-medium">{props.name}</span>
      </li>
    </Link>
  );
}

export default function OffCanvas() {
  const { canvas, setCanvas, setGenres } = store();
  return (
    <>
      <div
        className={
          "w-[200px] bg-slate-200 transition-all duration-200 fixed bottom-0 top-0 z-30 dark:bg-sdarks" +
          (canvas ? " left-0" : " left-[-200px]")
        }
      >
        <ul className="p-4">
          <div className="flex items-center justify-start mb-5">
            <div
              className="w-10 h-10 rounded-3xl bg-cover"
              style={{
                backgroundImage: `url('https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=468&height=468')`,
              }}
            ></div>
            <h2 className="dark:text-white font-medium ml-2 select-none">
              Paff Wandering
            </h2>
          </div>
          <CanvasSections name="Trang chủ" icon="home" path="/home" />

          <CanvasSections name="Yêu thích" icon="heart" path="/list" />
          <CanvasSections name="Lịch sử" icon="history" path="" />
          <CanvasSections name="Ngẫu nhiên" icon="shuffle" path="" />
          <CanvasSections name="Thể loại" icon="menu" path="" list="true" set={setGenres}/>
          <CanvasSections name="Thông báo" icon="bell" path="" />
          <CanvasSections name="Cài đặt" icon="cog" path="" />
          <CanvasSections name="Người dùng" icon="user" path="" />
        </ul>
      </div>
      {canvas ? (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-20 duration-150"
          onClick={setCanvas}
        ></div>
      ) : (
        false
      )}
    </>
  );
}
