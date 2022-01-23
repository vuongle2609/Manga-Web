import NavBar from "./components/NavBar";
import store from "./state";
import Modal from "./components/Modal";
import MainApp from "./components/MainApp";
import OffCanvas from "./components/OffCanvas";
import { useLayoutEffect } from "react";

export default function App() {
  useLayoutEffect(() => {
    const existingPreference = localStorage.getItem("theme");
    if (existingPreference) {
      existingPreference === "light" ? setDark("light") : setDark("dark");
    } else {
      setDark("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

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
    </>
  );
}
