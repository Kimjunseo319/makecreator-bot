const request = require("request");
const { MessageEmbed } = require("discord.js");
const _ = require("lodash");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

//①-난류 ②-우유 ③-메밀 ④-땅콩 ⑤-대두 ⑥-밀 ⑦-고등어 ⑧-게 ⑨-새우 ⑩-돼지고기 ⑪-복숭아 ⑫-토마토 ⑬-아황산염
const allergy = {
  1: "난류",
  2: "우유",
  3: "메밀",
  4: "땅콩",
  5: "대두",
  6: "밀",
  7: "고등어",
  8: "게",
  9: "새우",
  10: "돼지고기",
  11: "복숭아",
  12: "토마토",
  13: "아황산염",
};

const command = async function (message, args) {
  const date = args[0] ? args[0] : moment().toDate().getDate();
  let food = await getFoodInfo(date);
  console.log(food);
  const richMsg = new MessageEmbed()
    .setTitle(date + "일 급식 정보")
    .setColor(0x03fcba)
    .setFooter("schoolmenukr.ml 제공", "https://github.githubassets.com/favicons/favicon.png");
  if (food.length === 0) {
    richMsg.addField("오류", "급식이 없는 날 입니다!");
  } else {
    _.each(food, (f) => {
      richMsg.addField(f.name, getAllergy(f), true);
    });
  }
  message.channel.send(richMsg);
};

function getFoodInfo(date) {
  return new Promise((res, rej) => {
    const url = "https://schoolmenukr.ml/api/high/B100000587?allergy=formed&date=" + date;
    request(url, (err, response, body) => {
      if (err) rej(err);
      var json = JSON.parse(body);
      const food = json["menu"][0]["lunch"];
      res(food);
    });
  });
}

/**
 * food 오브젝트를 받아 allergy 값을 자연어로 변환해줍니다
 * @param {Object} food
 */
function getAllergy(food) {
  let allergyList = [];
  _.each(food.allergy, (a) => {
    const alergy = allergy[a];
    if (alergy !== undefined) {
      allergyList.push(alergy);
    }
  });
  return Array.from(new Set(allergyList)).join(" ,");
}

module.exports = {
  name: "급식",
  description: "오늘 급식을 알려줍니다",
  execute(message, args) {
    command(message, args);
  },
};
