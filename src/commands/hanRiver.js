const request = require("request");

const hanriverAPI = "http://hangang.dkserver.wo.tc/";

const command = function (message, args) {
  request(hanriverAPI, (err, res, body) => {
    const json = JSON.parse(body);
    message.reply(`한강 수온은 ${json["temp"]}도 입니다!`);
  });
};

module.exports = {
  name: "한강수온",
  description: "한강 수온을 알려줍니다",
  execute(message, args) {
    command(message, args);
  },
};
