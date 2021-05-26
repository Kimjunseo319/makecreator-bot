const dotenv = require("dotenv");
dotenv.config();

const Discord = require("discord.js");
const client = new Discord.Client();

const option = require("../option.json");

const fs = require("fs");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log("[명령어]" + option.command_prefix + command.name + " 명령어가 적용되었습니다!");
}

client.on("ready", () => {
  console.log(`${client.user.tag}로 로그인되었습니다!`);
  client.user.setActivity(".급식 .일정 .월간일정", "");
});

client.on("message", async (message) => {
  if (!message.content.startsWith(option.command_prefix) || message.author.bot) return;

  const args = message.content.slice(option.command_prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.reply("명령에 필요한 인자가 존재하지 않습니다!");
  }

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply("그 명령을 실행할 수 없습니다!");
  }
});

client.login(process.env.BOT_TOKEN);
