import store from "../state";
import { Link } from "react-router-dom";

function CanvasSections(props) {
  const { setCanvas } = store();
  return props.list ? (
    <li
      className={
        "flex items-center justify-start pt-5 px-4  dark:text-white hover:cursor-pointer  "
      }
      onClick={props.set}
    >
      <i className={`bx bx-${props.icon}  mr-3 text-2xl`}></i>
      <span className="select-none  text-base font-normal">{props.name}</span>
    </li>
  ) : (
    <Link to={props.path} onClick={setCanvas}>
      <li
        className={
          "flex items-center justify-start pt-5 px-4  dark:text-white  "
        }
      >
        <i className={`bx bx-${props.icon} mr-3 text-2xl`}></i>
        <span className="select-none text-base font-normal">{props.name}</span>
      </li>
    </Link>
  );
}

function UserSections(props) {
  return (
    <div className="w-full dark:bg-sdarks bg-slights rounded-xl flex items-center justify-start p-5">
      <div
        className="h-[46px] w-[46px] rounded-full bg-cover bg-center flex-2"
        style={{ backgroundImage: `url("${props.userImg}")` }}
      ></div>
      <div className="flex flex-col pl-4 w-9/12">
        <span className="text-base dark:text-white font-medium overflow-hidden text-ellipsis w-full">
          Mikuanmigoi
        </span>
        <span className="text-sm text-textGray dark:text-textDarkGray">
          Role: User
        </span>
      </div>
    </div>
  );
}

function FooterLink(props) {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center dark:text-white"
    >
      <i class={`bx mr-1 bxl-${props.icon}`}></i>
      <span>{props.label}</span>
    </a>
  );
}

export default function OffCanvas() {
  const { canvas, setCanvas, setGenres } = store();
  return (
    <>
      <div
        className={
          "w-[82%]  md:w-[300px] bg-white transition-all duration-200 fixed bottom-0 top-0 z-30 dark:bg-bdark border-r-2 border-slights dark:border-sdarks border-dashed" +
          (canvas ? " left-0" : " -left-[82%] md:-left-[300px] ")
        }
      >
        <ul className="px-5 py-6 h-full flex flex-col">
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
          <UserSections userImg="https://media.discordapp.net/attachments/893838005830303796/935046752313172048/FB_IMG_1642998761563.jpg?width=956&height=676" />
          <h3 className="mt-6 text-xl font-medium dark:text-white">Khám phá</h3>
          <CanvasSections name="Trang chủ" icon="home" path="/home" />
          <CanvasSections
            name="Thể loại"
            icon="menu"
            path=""
            list="true"
            set={setGenres}
          />
          <h3 className="mt-6 text-xl font-medium dark:text-white">
            Người dùng
          </h3>
          <CanvasSections name="Thông báo" icon="bell" path="" />
          <CanvasSections name="Yêu thích" icon="heart" path="/list" />
          <CanvasSections
            name="Lịch sử"
            icon="history"
            path="/list?history=true"
          />
          <CanvasSections name="Cài đặt" icon="cog" path="" />
          <div className="mt-auto flex items-center justify-evenly ">
            <FooterLink
              icon="github"
              label="GitHub"
              link="https://github.com/vuongle2609"
            />
            <FooterLink
              icon="facebook-circle"
              label="Facebook"
              link="https://www.facebook.com/vuong.lethanh.315/"
            />
            <FooterLink
              icon="twitter"
              label="Twitter"
              link="https://twitter.com/paff2609"
            />
          </div>
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
