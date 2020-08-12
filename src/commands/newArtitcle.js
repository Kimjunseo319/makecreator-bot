const { MessageEmbed } = require("discord.js");

const PostUtil = require("../utils/newPost");

const command = async function (message, args) {
  const richMsg = new MessageEmbed().setTitle("test").setColor(0x03fcba);
  const posts = await PostUtil.fetchArticles();
  console.log(posts);
};

module.exports = {
  name: "새글",
  description: "사랑발 카페의 새글을 불러옵니다",
  execute(message, args) {
    command(message, args);
  },
};
