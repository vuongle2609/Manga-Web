import Home from "./Home";

export default function MainApp() {
  return (
    <div className={"w-screen bg-slate-100 h-screen"}>
      <div className="grid wide">
        <div className="row">
          <div className="col c-12">
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
}
