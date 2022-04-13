import store from "../state";
import { Link, useLocation } from "react-router-dom";
import BouncingBalls from "react-cssfx-loading/lib/BouncingBalls";
import { getUser } from "../getData";
import { useEffect } from "react";

function CanvasSelector(props) {
  const location = useLocation();
  const match = location.pathname.slice(1) === props.to;
  return (
    <li
      className={
        "flex items-center justify-start py-2 rounded-lg px-4 dark:text-textDarkGray hover:cursor-pointer" +
        (match ? " bg-redActive" : "")
      }
      onClick={props.set}
    >
      <i
        className={
          `bx bx-${props.icon}  mr-3 text-2xl` + (match ? " text-primary " : "")
        }
      ></i>
      <span
        className={
          `select-none text-base font-normal` + (match ? " text-primary " : "")
        }
      >
        {props.name}
      </span>
    </li>
  );
}

function CanvasSections(props) {
  return (
    <li
      className={
        "flex items-center justify-start py-2 rounded-lg px-4 dark:text-textDarkGray " +
        (props.match ? " bg-redActive" : "")
      }
    >
      <i
        className={
          `bx bx-${props.icon} mr-3 text-2xl` +
          (props.match ? " text-primary " : "")
        }
      ></i>
      <span
        className={
          `select-none text-base font-normal` +
          (props.match ? " text-primary " : "")
        }
      >
        {props.name}
      </span>
    </li>
  );
}

function UserSections(props) {
  const { userData, setCanvas } = store();

  let render;

  if (userData === "wait") {
    render = (
      <div className="w-full p-5 flex justify-center items-center">
        <BouncingBalls
          color="#ff6740"
          width="20px"
          height="20px"
          duration="500ms"
        />
      </div>
    );
  } else if (!userData) {
    render = (
      <Link
        className="w-full  bg-primary rounded-xl items-center p-5 
        text-white flex justify-center font-bold text-base"
        onClick={() => setCanvas(false)}
        to="/login"
      >
        Đăng nhập
      </Link>
    );
  } else {
    render = (
      <Link
        to={`/user`}
        onClick={() => setCanvas(false)}
        className="w-full dark:bg-sdarks bg-slights rounded-xl flex items-center justify-start p-5"
      >
        <div
          className="h-[46px] w-[46px] rounded-full bg-cover bg-center flex-2"
          style={{ backgroundImage: `url("${userData.avatar}")` }}
        ></div>
        <div className="flex flex-col pl-4 w-9/12">
          <span className="text-base dark:text-white font-medium overflow-hidden text-ellipsis w-full">
            {userData.name}
          </span>
          <span className="text-sm text-textGray dark:text-textDarkGray">
            Role: {userData.role}
          </span>
        </div>
      </Link>
    );
  }

  return render;
}

function FooterLink(props) {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center dark:text-white"
    >
      <i className={`bx mr-1 bxl-${props.icon}`}></i>
      <span>{props.label}</span>
    </a>
  );
}

function CustomLink({ to, name, icon }) {
  const location = useLocation();
  const match = location.pathname === to;
  const { setCanvas } = store();

  return (
    <Link to={to} onClick={setCanvas}>
      <CanvasSections name={name} icon={icon} match={match} />
    </Link>
  );
}

export default function OffCanvas() {
  const { canvas, setCanvas, setGenres, setUserData, userData } = store();

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
          <h3 className="mt-6 mb-2 text-xl font-medium dark:text-white">
            Khám phá
          </h3>
          <CustomLink to="/home" name="Trang chủ" icon="home" />
          <CanvasSelector
            name="Thể loại"
            icon="menu"
            path=""
            to="genres"
            list="true"
            set={setGenres}
          />
          <h3 className="mt-6 mb-2 text-xl font-medium dark:text-white">
            Người dùng
          </h3>
          <CustomLink to="/favourite" name="Yêu thích" icon="heart" />
          <CustomLink to="/history" name="Lịch sử" icon="history" />
          {/* <CanvasSections name="Thông báo" icon="bell" path="" /> */}
          {/* <CanvasSections name="Cài đặt" icon="cog" path="" /> */}
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
          className="fixed top-0 bottom-0 left-0 right-0 z-20 duration-150 bg-modalw dark:bg-modal opacity-ani"
          onClick={setCanvas}
        ></div>
      ) : (
        false
      )}
    </>
  );
}
