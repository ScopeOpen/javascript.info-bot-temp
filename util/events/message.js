const { Collection } = require("discord.js");
const ms = require("ms");

const config = require("../../config.json");
const client = require("../../index.js");

const prefix = config.Configuration.Prefix;
const cooldown = new Collection();

client.on("messageCreate", async (message) => {
  if (message.content.bot) return;
  if (message.channel.type !== 0) return;
  if (!message.content.startsWith(prefix)) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (command) {
    if (command.cooldown) {
      if (cooldown.has(`${command.name}-${message.author.id}`)) {
        message.channel.send({ content: config.Configuration.Messages.COOLDOWN.replace( "<duration>", ms( cooldown.get(`${command.name}-${message.author.id}`) - Date.now(), { long: true } ) ), });
        return;
      }

      if (command.USERPERMS || command.BOTPERMS) {
        if (cooldown.has(`${command.name}-${message.author.id}`)) {

        }

      }
    }
  }
});
