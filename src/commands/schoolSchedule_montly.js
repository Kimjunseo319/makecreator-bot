const School = require("school-kr");
const school = new School();
const _ = require("lodash");

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const { MessageEmbed } = require("discord.js");

const command = async function (message, args) {
  let month = args[0] ? args[0] : moment().toDate().getMonth() + 1;

  school.init(School.Type.HIGH, School.Region.SEOUL, "B100000587");
  const calendar = await school.getCalendar(moment().toDate().getFullYear(), month ? month : moment().toDate().getMonth() + 1);
  const richMsg = new MessageEmbed()
    .setTitle((month ? month : moment.tz("Asia/Seoul").toDate().getMonth()) + "월 학사일정 정보")
    .setColor(0x03fcba)
    .setFooter("서울특별시교육청 제공", "https://lib.sen.go.kr/resources/homepage/common/img/ci_logo_taye3.gif");

  const today = calendar["day"];

  delete calendar["year"];
  delete calendar["month"];
  delete calendar["day"];
  delete calendar["today"];

  let key = 1;

  _.each(calendar, (c) => {
    if (today !== key) {
      richMsg.addField(key + "일", c === "" ? "없음" : c, true);
    } else {
      richMsg.addField(key + "일(오늘)", c === "" ? "없음" : c, true);
    }

    key++;
  });

  message.channel.send(richMsg);
};

module.exports = {
  name: "월간일정",
  description: "월간 학사 일정을 알려줍니다",
  execute(message, args) {
    command(message, args);
  },
};
