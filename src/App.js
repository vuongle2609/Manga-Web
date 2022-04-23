import NavBar from "./components/NavBar";
import store from "./state";
import Modal from "./components/Modal";
import MainApp from "./components/MainApp";
import OffCanvas from "./components/OffCanvas";
import LoadingModel from "./components/LoadingModel";
import LogoutModel from "./components/LogoutModel";
import CoverModal from "./components/CoverModal";
import { useLayoutEffect } from "react";
import { getUser } from "./getData";
import useStore from "./state";

export default function App() {
  const { setUserData,userData } = useStore();
  useLayoutEffect(() => {
    const existingPreference = localStorage.getItem("theme");
    if (existingPreference) {
      existingPreference === "light" ? setDark("light") : setDark("dark");
    } else {
      setDark("light");
      localStorage.setItem("theme", "light");
    }
  }, []);
  const handleData = async () => {
    const gtoken = localStorage.getItem("token");
    if (gtoken) {
      try {
        const newUserData = await getUser(gtoken);
        setUserData(newUserData);
      } catch (err) {
        localStorage.removeItem("token");
        setUserData(false);
      }
    } else {
      setUserData(false);
    }
  };

  if (userData === "wait") handleData();

  const { isDark, setDark } = store();

  window.onbeforeunload = function () {
    localStorage.removeItem("homeData");
  };

  if (isDark === "dark") {
    document.getElementsByTagName("html")[0].classList.add("dark");
  } else {
    document.getElementsByTagName("html")[0].classList.remove("dark");
  }

  return (
    <>
      <NavBar />

      <div className="app mt-[56px] flex relative">
        <OffCanvas />
        <MainApp />
      </div>

      <Modal />
      <LoadingModel />
      <LogoutModel />
      <CoverModal />
    </>
  );
}
