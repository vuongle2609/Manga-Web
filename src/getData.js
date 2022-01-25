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

export const handleURL = ({ list, genre, status, sort }) => {
  return (
    "/list?" +
    (list ? "list=true" : "") +
    (genre ? `genre=${genre}` : "") +
    (status ? `s&tatus=${status}` : "") +
    (sort ? `&sort=${sort}` : "")
  );
};
