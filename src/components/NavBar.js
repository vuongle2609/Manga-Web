import store from "../state";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isDark, setDark, setSearch, setCanvas } = store();
  return (
    <div
      className="flex absolute top-0 left-0 bg-white
    dark:bg-bdark h-[56px] items-center w-full z-10"
    >
      <div className="grid wide">
        <div className="row justify-between items-center">
          <div className="flex items-center">
            <i
              className="bx bx-menu-alt-left dark:text-white text-3xl mr-1 hover:cursor-pointer"
              onClick={setCanvas}
            ></i>
            <Link to={'/home'}
              className="w-10 h-10 rounded-3xl bg-cover"
              style={{
                backgroundImage: `url('https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=468&height=468')`,
              }}
            ></Link>
            <Link to={'/home'} className="dark:text-white font-medium ml-2 select-none">
              Paff Wandering
            </Link>
          </div>

          <div className="flex items-center">
            <div
              type="text"
              className="h-10 w-[300px] rounded-md bg-gray-200 dark:bg-gray-600 pl-3
            sm:flex justify-start items-center relative cursor-text hidden
            "
              onClick={setSearch}
            >
              <i className="bx bx-search text-2xl dark:text-white absolute top-1/2 -translate-y-1/2"></i>
              <p className="dark:text-white ml-7 select-none">Tìm kiếm...</p>
            </div>
            <i
              className="bx bx-search text-2xl dark:text-white md:hidden"
              onClick={setSearch}
            ></i>
            {isDark === "dark" ? (
              <i
                className="bx text-2xl ml-3 bx-moon text-white cursor-pointer"
                onClick={() => {
                  setDark("light");
                  localStorage.setItem("theme", "light");
                }}
              ></i>
            ) : (
              <i
                className="bx text-2xl ml-3 bx-sun cursor-pointer"
                onClick={() => {
                  setDark("dark");
                  localStorage.setItem("theme", "dark");
                }}
              ></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
