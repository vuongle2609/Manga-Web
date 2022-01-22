import Home from "./Home";
import ListManga from "./ListManga"
import { Routes, Route } from "react-router-dom";

export default function MainApp() {
  return (
    <div className={"w-screen bg-slate-100 min-h-screen dark:bg-bdark"}>
      <div className="grid wide">
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<ListManga />} />
        </Routes>
      </div>
    </div>
  );
}
