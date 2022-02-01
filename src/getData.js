export const getPopular = async () => {
  const res = await fetch("https://mangalh-api.vercel.app/home");
  const data = await res.json();
  return data.data;
};

export const getDetail = async (ep) => {
  const res = await fetch(`https://mangalh-api.vercel.app/manga/${ep}`);
  const data = await res.json();
  return data.data;
};

export const getPages = async ({ mangaEP, chapterEP }) => {
  const res = await fetch(
    `https://mangalh-api.vercel.app/manga/${mangaEP}/${chapterEP}`
  );
  const data = await res.json();
  return data.data;
};

export const getList = async ({ list, genre, status, sort, page }) => {
  let fetchLink;

  if (list) {
    fetchLink =
      "https://mangalh-api.vercel.app/list?list=true&" +
      (sort ? "sort=" + sort + "&" : "") +
      (status ? "status=" + status + "&" : "") +
      (page ? "page=" + page : "");
  } else {
    fetchLink =
      "https://mangalh-api.vercel.app/list?genre=" +
      genre +
      "&" +
      (sort ? "sort=" + sort + "&" : "") +
      (status ? "status=" + status + "&" : "") +
      (page ? "page=" + page : "");
  }

  const res = await fetch(fetchLink);
  const data = await res.json();
  return data.data;
};

export const getSearch = async ({ keyword }) => {
  if (keyword.length > 0) {
    const res = await fetch(
      `https://mangalh-api.vercel.app/search?keyword=${keyword}`
    );
    const data = await res.json();

    return data.data;
  } else {
    return false;
  }
};

export const timeHandle = (ltime) => {
  const date1 = new Date();
  const date2 = new Date(ltime);

  const secDiff = Math.round((date1 - date2) * 0.001);
  if (secDiff < 60) return secDiff + " giây trước";

  const minDiff = Math.round(secDiff / 60);
  if (minDiff < 60) return minDiff + " phút trước";

  const hourDiff = Math.round(minDiff / 60);
  if (hourDiff < 24) return secDiff * 60 + " giờ trước";

  const dayDiff = Math.round(hourDiff / 24);
  if (dayDiff < 365) return dayDiff + " ngày trước";

  const yearDiff = Math.round(dayDiff / 365)
  return yearDiff + " Năm trước";
};

export const handleURL = ({ list, genre, status, sort }) => {
  return (
    "/list?" +
    (list ? "list=true" : "") +
    (genre ? `genre=${genre}` : "") +
    (status ? `&status=${status}` : "") +
    (sort ? `&sort=${sort}` : "")
  );
};

export const getUrlStatus = ({ list, genre, status }) => {
  return (
    "/list?" +
    (list ? "list=true" : "") +
    (genre ? `genre=${genre}` : "") +
    (status ? `&status=${status}` : "")
  );
};

export const getUrlSort = ({ list, genre, sort }) => {
  return (
    "/list?" +
    (list ? "list=true" : "") +
    (genre ? `genre=${genre}` : "") +
    (sort ? `&sort=${sort}` : "")
  );
};
