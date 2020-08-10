const School = require("school-kr");
const school = new School();

const { MessageEmbed } = require("discord.js");

const command = async function (message, args) {
  let month = null;
  let date = null;
  if (args[1] !== undefined) {
    month = args[0] ? args[0] : new Date().getMonth() + 1;
    date = args[1] ? args[1] : new Date().getDate();
  } else {
    date = args[0] ? args[0] : new Date().getDate();
  }

  school.init(School.Type.HIGH, School.Region.SEOUL, "B100000587");
  const calendar = await school.getCalendar(new Date().getFullYear(), month ? month : new Date().getMonth() + 1);
  const richMsg = new MessageEmbed()
    .setTitle(date + "일 학사일정 정보")
    .setColor(0x03fcba)
    .setFooter("서웉특별시교육청 제공", "https://lib.sen.go.kr/resources/homepage/common/img/ci_logo_taye3.gif");

  richMsg.setDescription(`${date}일의 학사일정은 ${calendar[date] ? calendar[date] + "입니다!" : "없습니다!"}`);

  message.channel.send(richMsg);
};

module.exports = {
  name: "일정",
  description: "학사 일정을 알려줍니다",
  execute(message, args) {
    command(message, args);
  },
};
