import axios from "axios";

const apiPath = process.env.REACT_APP_BASE_API;
const userPath = process.env.REACT_APP_USER_API;

const mangaGet = axios.create({
  baseURL: apiPath,
});

const mangaUser = axios.create({
  baseURL: userPath,
});

export const updateHistory = async (mangaObj) => {
  const token = localStorage.getItem("token");
  const data = await axios.post(
    "/history",
    { manga: mangaObj },
    {
      baseURL: userPath,
      headers: { authorization: `Beaer ${token}` },
    }
  );

  return data;
};

export const changeInfo = async (userDataSet) => {
  const token = localStorage.getItem("token");
  const data = await axios.post("/user", userDataSet, {
    baseURL: userPath,
    headers: { authorization: `Beaer ${token}` },
  });

  return data;
};

export const deleteManga = async (mangaEp) => {
  const token = localStorage.getItem("token");
  const data = await axios.delete("/manga", {
    data: {
      manga_ep: mangaEp,
    },
    baseURL: userPath,
    headers: { authorization: `Beaer ${token}` },
  });

  return data;
};

export const updateManga = async (mangaObj) => {
  const token = localStorage.getItem("token");
  const data = await axios.post(
    "/manga",
    {
      manga: mangaObj,
    },
    {
      baseURL: userPath,
      headers: { authorization: `Beaer ${token}` },
    }
  );

  return data;
};

export const getUser = async (token) => {
  const data = await axios.get(`${userPath}/user`, {
    headers: {
      authorization: `Beaer ${token}`,
    },
  });

  return data.data.user;
};

export const loginUser = async (user) => {
  const data = await mangaUser.post(`/login`, {
    ...user,
  });
  return data;
};

export const registerUser = async (user) => {
  const data = await mangaUser.post(`/register`, {
    ...user,
  });
  return data;
};

export const getPopular = async () => {
  const data = await mangaGet.get(`/home`);
  return data.data.data;
};

export const getDetail = async (ep) => {
  const data = await mangaGet.get(`/manga/${ep}`);
  return data.data.data;
};

export const getPages = async ({ mangaEP, chapterEP }) => {
  const data = await mangaGet.get(`/manga/${mangaEP}/${chapterEP}`);
  return data.data.data;
};

export const getList = async ({ genre, status, sort, page }) => {
  let fetchLink;

  if (genre) {
    fetchLink =
      `${apiPath}/list?genre=` +
      genre +
      "&" +
      (sort ? "sort=" + sort + "&" : "") +
      (status ? "status=" + status + "&" : "") +
      (page ? "page=" + page : "");
  } else {
    fetchLink =
      `${apiPath}/list?list=true&` +
      (sort ? "sort=" + sort + "&" : "") +
      (status ? "status=" + status + "&" : "") +
      (page ? "page=" + page : "");
  }

  const data = await mangaGet.get(fetchLink);
  return data.data.data;
};

export const getSearch = async ({ keyword }) => {
  if (keyword.length > 0) {
    const data = await mangaGet.get(`/search?keyword=${keyword}`);
    return data.data.data;
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
  if (hourDiff < 24) return hourDiff + " giờ trước";

  const dayDiff = Math.round(hourDiff / 24);
  if (dayDiff < 365) return dayDiff + " ngày trước";

  const yearDiff = Math.round(dayDiff / 365);
  return yearDiff + " Năm trước";
};

export const handleURL = ({ genre, status, sort }) => {
  return (
    "/genres?" +
    (genre ? `genre=${genre}` : "") +
    (status ? `&status=${status}` : "") +
    (sort ? `&sort=${sort}` : "")
  );
};

export const getUrlStatus = ({ genre, status }) => {
  return (
    "/genres?" +
    (genre ? `genre=${genre}` : "") +
    (status ? `&status=${status}` : "")
  );
};

export const getUrlSort = ({ genre, sort }) => {
  return (
    "/genres?" + (genre ? `genre=${genre}` : "") + (sort ? `&sort=${sort}` : "")
  );
};

export const handleGenreEP = (genre) => {
  return removeVietnameseTones(genre).toLowerCase().replace(/\s/g, "-").trim();
};

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  str = str.replace(/ + /g, " ");
  str = str.trim();
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
