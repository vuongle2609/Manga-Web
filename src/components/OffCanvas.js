import store from "../state";

function CanvasSections(props) {
  return (
    <li className={"flex items-center justify-start py-2 px-3 dark:text-white"}>
      <i className={`bx bx-${props.icon} mr-1 text-2xl`}></i>
      <span className="select-none font-medium">{props.name}</span>
    </li>
  );
}

export default function OffCanvas() {
  const { canvas, setCanvas } = store();
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
          <CanvasSections
            name="Trang chủ"
            icon="home"
            active="active"
            to="/home"
          />

          <CanvasSections name="Yêu thích" icon="heart" />
          <CanvasSections name="Lịch sử" icon="history" />
          <CanvasSections name="Ngẫu nhiên" icon="shuffle" />
          <CanvasSections name="Thể loại" icon="menu" />
          <CanvasSections name="Thông báo" icon="bell" />
          <CanvasSections name="Cài đặt" icon="cog" />
          <CanvasSections name="Người dùng" icon="user" />
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
