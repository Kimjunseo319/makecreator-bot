//https://cafe.naver.com/samddeng?iframe_url=/ArticleList.nhn?search.clubid=27155952 <-- 전체글 보기
//https://cafe.naver.com/samddeng?iframe_url=/ArticleList.nhn?search.clubid=27155952%26search.menuid=1 <-- 공지사항

// https://cafe.naver.com/ArticleList.nhn?search.clubid=27155952&search.menuid=1&search.boardtype=L <-- 공자시항
const cheerio = require("cheerio");
const encoding = require("encoding");
const request = require("request");

const fetchArticles = async function () {
  const cafe = request(
    "https://cafe.naver.com/ArticleList.nhn",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
        referer: "https://cafe.naver.com/samddeng",
        Cookie:
          "nci4=a393725f4c0a69dc856b2c3b36ddb5c0693bc42d7102ed16cc38c04aa2cc6dc2fa01ace82a6ff6afd1af17d700e8bfdd52266a8bf593d0efb507de0a53f12880a6eeaa73ec8b969b9ce6e4bce1e4fc976e090423023323261c02130036391232033c202f0a2d1a552629012512342e5e7a5d6b29595473506130414c6b4a7b374746614475404f7e597a4b04080b0f0c0e0d18616c4b6a58161f76181315721fe0e1e489e9e8eaec4a; ncvid=#vid#_125.187.54.182ITVM; JSESSIONID=7F49178474EF35FF216E58AEA6331284",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        Host: "cafe.naver.com",
      },
      qs: {
        "search.clubid": "27155952",
        "search.menuid": "1",
        "search.boardtype": "L",
      },
      encoding: null,
    },
    (err, res, body) => {
      let body_u = encoding.convert(body, "utf-8", "euc-kr").toString();
      console.log(body_u);
    }
  );
};

module.exports = {
  fetchArticles: fetchArticles,
};
