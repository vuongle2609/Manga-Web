import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../state";
import { changeInfo } from "../getData";

const Divider = () => {
  return <div className="bg-textDarkGray w-full h-[1px] my-4"></div>;
};

const UserInfo = () => {
  const { userData, setCover, setLoad, setUserData } = useStore();
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState(userData.name);
  const [avatarValue, setAvatarValue] = useState(userData.avatar);
  const [passwordValue, setPasswordValue] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [log, setLog] = useState(false);

  const submitForm = async (e) => {
    setLog(false);
    e.preventDefault();
    setLoad(true);
    const userDataSet = {
      name: nameValue !== userData.name ? nameValue : userData.name,
      avatar: avatarValue !== userData.avatar ? avatarValue : userData.avatar,
      newPassword:
        passwordValue.newPassword.length > 0
          ? passwordValue.newPassword
          : false,
      password: passwordValue.password,
    };

    if (passwordValue.newPassword !== passwordValue.confirmPassword) {
      setLog("Mật khẩu xác nhận không trùng khớp");
      setLoad(false);
      return;
    }

    if (
      passwordValue.newPassword === passwordValue.password &&
      passwordValue.newPassword.length > 0
    ) {
      setLog("Mật khẩu mới không được trùng khớp");
      setLoad(false);
      return;
    }

    try {
      const newUserData = await changeInfo(userDataSet);
      setUserData(newUserData.data.user);
    } catch (err) {
      const status = err.response.status;
      if (status === 500) {
        setLog("Lỗi sever");
      } else if (status === 400) {
        setLog("Sai mật khẩu");
      } else {
        setLog("Lỗi không xác định");
      }
    }

    setLoad(false);
  };

  return (
    <div className="grid wide">
      <div className="row">
        <div className="col c-12 dark:text-white">
          <div className="relative mb-4">
            <i
              onClick={() => navigate(-1)}
              className="bx bx-left-arrow-alt text-2xl absolute top-[50%] -translate-y-[50%]"
            ></i>
            <h3 className="font-bold text-xl ml-7">Cài đặt người dùng</h3>
          </div>
          <form onSubmit={submitForm}>
            <h3 className="text-lg">Tên hiển thị</h3>
            <input
              type="text"
              className="bg-transparent border-[1px] w-full border-textDarkGray focus:border-primary
                outline-none rounded-md py-2 px-4 mt-2 mb-4"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />

            <h3 className="text-lg">Ảnh đại diện</h3>
            <input
              type="text"
              className="bg-transparent border-[1px] w-full border-textDarkGray focus:border-primary
            outline-none rounded-md py-2 px-4 mt-2"
              value={avatarValue}
              onChange={(e) => setAvatarValue(e.target.value)}
            />
            <div
              className="w-full flex justify-center my-4"
              onClick={() => setCover(avatarValue)}
            >
              <img src={avatarValue} alt="" className="h-44 rounded-md" />
            </div>

            <h3 className="text-lg">Mật khẩu cũ</h3>
            <input
              type="text"
              className="bg-transparent border-[1px] w-full border-textDarkGray focus:border-primary
            outline-none rounded-md py-2 px-4 mt-2"
              value={passwordValue.password}
              onChange={(e) => {
                setPasswordValue({
                  ...passwordValue,
                  password: e.target.value,
                });
              }}
            />
            <h3 className="text-lg block mt-2">Mật khẩu mới</h3>
            <input
              type="text"
              className="bg-transparent border-[1px] w-full border-textDarkGray focus:border-primary
            outline-none rounded-md py-2 px-4 mt-2"
              value={passwordValue.newPassword}
              onChange={(e) => {
                setPasswordValue({
                  ...passwordValue,
                  newPassword: e.target.value,
                });
              }}
            />
            <h3 className="text-lg block mt-2">Xác nhận mật khẩu</h3>
            <input
              type="text"
              className="bg-transparent border-[1px] w-full border-textDarkGray focus:border-primary
            outline-none rounded-md py-2 px-4 mt-2"
              value={passwordValue.confirmPassword}
              onChange={(e) => {
                setPasswordValue({
                  ...passwordValue,
                  confirmPassword: e.target.value,
                });
              }}
            />
            <span className="text-red-500 block mb-2">{log}</span>
            <div className="flex justify-between mt-2">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md block 
                transition-all active:scale-95"
              >
                Thay đổi
              </button>

              <button
                className="bg-textDarkGray text-white px-4 py-2 rounded-md block 
                transition-all active:scale-95"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Hủy thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
