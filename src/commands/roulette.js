const { MessageEmbed } = require("discord.js");

const command = function (message, args) {
  const richMsg = new MessageEmbed().setTitle("룰렛").setColor(0x03fcba);
  richMsg.setDescription("test");
  message.channel.send(richMsg);
};

module.exports = {
  name: "룰렛",
  description: "룰렛입니다",
  execute(message, args) {
    command(message, args);
  },
};
