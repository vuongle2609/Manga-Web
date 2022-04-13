import React from "react";
import useStore from "../state";
import { useNavigate } from "react-router-dom";

const LogoutModel = () => {
  const { confirmOut, setUserData, setConfirmOut } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(false);
    setConfirmOut(false);
    navigate("/home");
    window.location.reload(false);
  };

  return (
    <div
      className={
        "fixed top-0 bottom-0 left-0 right-0 bg-modalw dark:bg-modal z-[99998] " +
        " items-center justify-center duration-150 opacity-ani" +
        (confirmOut ? " flex" : " hidden")
      }
    >
      <div className="bg-white dark:bg-bdark rounded-md p-4 shadow-lg">
        <h2 className="font-bold dark:text-white text-lg block mb-2">
          Bạn có chắc muốn đăng xuất
        </h2>
        <div className="flex justify-end">
          <div
            onClick={handleLogout}
            className="bg-red-500 text-white px-2 py-1 rounded-md mr-2 cursor-pointer"
          >
            Đăng xuất
          </div>
          <div
            onClick={() => setConfirmOut(false)}
            className="bg-white dark:bg-sdarks dark:text-white px-2 py-1 rounded-md cursor-pointer"
          >
            Hủy
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModel;
