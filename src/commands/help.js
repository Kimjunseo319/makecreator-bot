const { MessageEmbed } = require("discord.js");

const command = function (message, args) {
  const richMsg = new MessageEmbed().setTitle("도움말").setColor(0x03fcba);
};

module.exports = {
  name: "도움말",
  description: "도움말입니다",
  execute(message, args) {
    command(message, args);
  },
};
