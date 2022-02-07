import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

export default function MangaCard(props) {

  return (
    <div className="w-full mb-3">
      <LazyLoad>
        <Link to={`/manga?name=${props.mangaEP}`}>
          <div
            style={{ backgroundImage: `url('${props.cover}')` }}
            className={"pt-[142.5%] bg-cover rounded-lg overflow-hidden relative shadow-sm shadow-black" + (props.slider ? '' : 'scale-100 hover:scale-105 duration-150')}
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
      </LazyLoad>
    </div>
  );
}
