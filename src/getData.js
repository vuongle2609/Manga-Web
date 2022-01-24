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