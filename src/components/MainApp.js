import Home from "./Home";
import ListManga from "./ListManga";
import MangaDetailPage from "./MangaDetailPage";
import MangaReadPage from "./MangaReadPage";
import Error from "./Error";
import ToTop from "./ToTop";
import { Routes, Route } from "react-router-dom";

export default function MainApp() {
  return (
    <div className={"w-screen bg-slate-100 min-h-screen dark:bg-bdark transition-all duration-100"}>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<ListManga />} />
        <Route path="/manga" element={<MangaDetailPage />} />
        <Route path="/read" element={<MangaReadPage />} />
      </Routes>
      <ToTop />
    </div>
  );
}
