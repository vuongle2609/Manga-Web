import NavBar from "./components/NavBar";
import store from "./state";
import Modal from "./components/Modal";
import MainApp from "./components/MainApp";
import OffCanvas from "./components/OffCanvas";

export default function App() {
  const { isDark } = store();
  if (!isDark) {
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
