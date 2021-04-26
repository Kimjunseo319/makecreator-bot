const Discord = require("discord.js");

const request = require("request");

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const _ = require("lodash");

const NodeCache = require("node-cache");
const neisCache = new NodeCache();

const { MessageEmbed } = require("discord.js");

/**
 *
 * @param {Discord.Message} message
 * @param {[String]} args
 */
const command = async function (message, args) {
  const now = moment().toDate();
  const classInfo = args[0].split("-");

  sendTimeTable(
    message,
    {
      year: now.getFullYear(),
      month: args[1] ? args[1].padStart(2, "0") : (now.getMonth() + 1).toString().padStart(2, "0"),
      day: args[2] ? args[2].padStart(2, "0") : now.getDate().toString().padStart(2, "0"),
    },
    classInfo[0],
    classInfo[1]
  );
};

/**
 *
 * @param {Discord.Message} message
 * @param {*} param1
 * @param {*} grade
 * @param {*} class_nm
 */
async function sendTimeTable(message, { year, month, day }, grade, class_nm) {
  let timeTable = neisCache.get(grade + "-" + class_nm + "/" + year + month + day);
  if (timeTable) {
    message.channel.send(buildEmbed(_.uniqWith(timeTable, _.isEqual), { month, day }));
  } else {
    const options = {
      method: "GET",
      url: encodeURI(
        `https://open.neis.go.kr/hub/hisTimetable?KEY=${
          process.env.NEIS_TOKEN
        }&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010591&ALL_TI_YMD=${
          year + month + day
        }&CLASS_NM=${class_nm}&GRADE=${grade}`
      ),
    };

    request(options, async function (err, res) {
      if (err) throw new Error(err);
      const data = JSON.parse(res.body);
      timeTable = data?.hisTimetable?.[1].row;
      neisCache.set(grade + "-" + class_nm + "/" + year + month + day, timeTable);
      message.channel.send(buildEmbed(_.uniqWith(timeTable, _.isEqual), { month, day }));
    });
  }
}

function buildEmbed(timeTable, { month, day }) {
  const embed = new MessageEmbed();
  try {
    embed.setTitle(`${month}월 ${day}일 ${timeTable[0].GRADE}학년 ${timeTable[0].CLASS_NM}반 시간표`);

    _.forEach(timeTable, (e) => {
      embed.addField(e.PERIO + "교시", e.ITRT_CNTNT);
    });
  } catch (err) {
    embed.description = "**!시간표가 존재하지 않습니다!**";
  }
  return embed;
}

module.exports = {
  name: "시간표",
  description: "시간표",
  async execute(message, args) {
    await command(message, args);
  },
};
