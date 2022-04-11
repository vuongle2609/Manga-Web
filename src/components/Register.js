import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../getData";
import useStore from "../state";
import error from "../img/94442641_p0.jpg";

const Register = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passHide, setPassHide] = useState(true);
  const [logpass, setLogpass] = useState(false);
  const [logname, setLogname] = useState(false);

  const navigate = useNavigate();

  const { userData } = useStore();

  if (userData) {
    if (userData !== "wait") {
      navigate("/home");
    }
  }

  const { setLoad } = useStore();

  const handleUsername = (e) => {
    setLogname(false);
    setUser(e.target.value);
  };

  const handlePassword = (e) => {
    setLogpass(false);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogpass(false);
    setLogname(false);
    const dataSubmit = {
      username: user.toLowerCase(),
      password,
    };

    if (dataSubmit.username.length < 6) {
      setLogname("Yêu cầu 6 kí tự trở lên");
      return;
    }

    if (dataSubmit.password.length < 6) {
      setLogpass("Yêu cầu 6 kí tự trở lên");
      return;
    }

    setLoad(true);

    try {
      const data = await registerUser(dataSubmit);
      navigate("/login");
    } catch (err) {
      const status = err.response.status;
      if (status === 400) {
        setLogname("Người dùng đã tồn tại");
      } else if (status === 500) {
        setLogpass("Lỗi phía sever");
      }
    }
    setLoad(false);
  };

  return (
    <div className="grid wide">
      <div className="row">
        <div className="col c-12 dark:text-white">
          <div className="flex lg:mt-24 justify-between">
            <div
              className="hidden lg:block lg:basis-[55%] bg-center bg-cover rounded-md"
              style={{ backgroundImage: `url(${error})` }}
            ></div>
            <div className="basis-[100%] lg:basis-[40%] block">
              <h2 className="font-bold text-2xl">Đăng ký</h2>
              <span className="text-textDarkGray mt-2 block">
                Tạo tài khoản nèo
              </span>
              <form
                className="text-textDarkGray mt-4 mb-4"
                onSubmit={handleSubmit}
              >
                <p className="text-black dark:text-white block mb-2">
                  Tên đăng nhập
                </p>
                <input
                  className="bg-transparent border-[1px] w-full border-textDarkGray focus:border-primary
                  outline-none rounded-md py-2 px-4 mb-2"
                  type="text"
                  onChange={handleUsername}
                  value={user}
                />
                <p className="text-red-400 text-xs block mb-4">{logname}</p>
                <p className="text-black dark:text-white block mb-2">
                  Mật khẩu
                </p>
                <div className="relative mb-2">
                  <input
                    className="bg-transparent border-[1px] w-full border-textDarkGray focus:border-primary
                  outline-none rounded-md py-2 pl-4 pr-10"
                    type={passHide ? "password" : "text"}
                    onChange={handlePassword}
                    value={password}
                  />
                  {passHide ? (
                    <i
                      className="bx bx-show absolute right-2 top-[50%] translate-y-[-50%] text-xl"
                      onClick={() => setPassHide(false)}
                    ></i>
                  ) : (
                    <i
                      className="bx bx-hide absolute right-2 top-[50%] translate-y-[-50%] text-xl"
                      onClick={() => setPassHide(true)}
                    ></i>
                  )}
                </div>
                <p className="text-red-500 text-xs">{logpass}</p>

                <button
                  className="bg-primary text-white w-full mt-6 py-3 rounded-md block 
                  transition-all active:scale-95"
                >
                  Đăng ký
                </button>
              </form>
              <span>Đã có tài khoản? </span>
              <Link className="text-primary" to="/login">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
