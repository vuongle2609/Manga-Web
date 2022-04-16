import Home from "./Home";
import ListManga from "./ListManga";
import MangaDetailPage from "./MangaDetailPage";
import MangaReadPage from "./MangaReadPage";
import Error from "./Error";
import ToTop from "./ToTop";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import UserInfo from "./UserInfo";
import { Routes, Route } from "react-router-dom";

export default function MainApp() {
  return (
    <div
      className={
        "w-screen bg-slate-100 min-h-screen dark:bg-bdark transition-all duration-100 absolute right-0"
      }
    >
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<ListManga />} />
        <Route path="/genres" element={<ListManga />} />
        <Route path="/list" element={<ListManga />} />
        <Route path="/favourite" element={<ListManga />} />
        <Route path="/manga" element={<MangaDetailPage />} />
        <Route path="/read" element={<MangaReadPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
      <ToTop />
    </div>
  );
}
