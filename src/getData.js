const getPopular = async () => {
  const res = await fetch("https://mangalh-api.vercel.app/home");
  const data = await res.json();
  return data.data;
};

const getDetail = async (ep) => {
  const res = await fetch(`https://mangalh-api.vercel.app/manga/${ep}`);
  const data = await res.json();
  return data.data;
};

module.exports = { getPopular, getDetail };
