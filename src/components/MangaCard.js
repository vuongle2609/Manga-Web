import { Link } from "react-router-dom";

export default function MangaCard(props) {
  return (
    <div className="w-full mb-3">
      <Link to={`/manga?name=${props.mangaEP}`}>
        <div
          style={{ backgroundImage: `url('${props.cover}')` }}
          className="pt-[142.5%] bg-cover rounded-sm relative"
        >
          <h4
            className="font-semibold line-clamp-2 text-white 
                absolute bottom-3 z-10 font-md w-full px-[10px] text-[14px] 
            "
          >
            {props.title}
          </h4>
          <span className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-b from-transparent to-slate-900"></span>
        </div>
      </Link>
    </div>
  );
}
