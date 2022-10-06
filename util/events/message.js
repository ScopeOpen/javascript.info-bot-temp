const { Collection } = require("discord.js");
const config = require("../../config.json");
const client = require("../../index.js");
const ms = require("ms");

const cooldownMap = new Map();
const Embed = config.Embed;

client.on("messageCreate", async (message) => {
  const prefix = config.Configuration.Prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  const cmdConf = cmd["SETTINGS"];

  if (
    !message.channel.permissionsFor(message.guild.members.me).has(
      "SendMessages",
    )
  ) return;
  if (cmdConf.ENABLED === false) return;

  // Check if command is ran by owner
  if (
    cmd.CATEGORY === "OWNER" &&
    !config.Configuration.DevID.includes(message.author.id)
  ) {
    return message.reply({ content: config.Configuration.Messages.OWNERONLY });
  }

  // Check is user has permissions
  if (cmd.USERPERMS && cmd.USERPERMS?.length > 0) {
    if (!message.channel.permissionsFor(message.member).has(cmd.USERPERMS)) {
      return message.reply({
        content: config.Configuration.Messages.INVALIDUSERPERMS.replace(
          "<perms>",
          cmd.USERPERMS,
        ),
      });
    }
  }

  // Check if bot has permissions
  if (cmd.BOTPERMS && cmd.BOTPERMS?.length > 0) {
    if (
      !message.channel.permissionsFor(message.guild.members.me).has(
        cmd.BOTPERMS,
      )
    ) {
      return message.reply({
        content: config.Configuration.Messages.INVALIDBOTPERMS.replace(
          "<perms>",
          cmd.BOTPERMS,
        ),
      });
    }
  }

  // Check if arguments are right
  if (cmdConf.MINARGS > args.length || cmdConf.MAXARGS < args.length) {
    const usage = this.getComandUsage(cmd, prefix, command);
    message.reply({ embeds: [usage] });
  }

  // Checking for cooldown
  if (cmd.cooldown > 0) {
    const remaining = checkRemaning(message.author.id, cmd);
    if (remaining > 0) {
      message.reply({ content: config.Configuration.Messages.COOLDOWN });
    }
  }

  // Running command
  try {
    await cmd.msgRun(client, message, args);
  } catch (e) {
    message.reply({ content: config.Configuration.Messages.FAILEDCMD });
  } finally {
    if (cmd.COOLDOWN > 0) applyCooldown(message.author.id, cmd);
  }
});

module.exports = {
  getComandUsage(cmd, prefix, command, emTitle = "Usage") {
    let desc = `Command: \`${prefix}${
      cmd.NAME || command
    }\`: \n Aliases: \`<aliases>\` \n Usage: \`${cmd.USAGE}\` \n Category: \`${cmd.CATEGORY}\` \n Cooldown: \`${cmd.SETTINGS.COOLDOWN}\``;

    if (cmd.SETTINGS.ALIASES.length >= 1) {
      desc.replace("<aliases>", cmd.SETTINGS.ALIASES.join(", "));
    }
    if (cmd.SETTINGS.ALIASES.length == 0) desc.replace("<aliases>", "NONE");

    const embed = new EmbedBuilder()
      .setColor(config.Configuration.Embed.COLOR)
      .setDescription(desc)
      .setTitle(emTitle);
    return embed;
  },
};

function applyCooldown(memberid, cmd) {
  const key = cmd.NAME + "-" + memberid;
  cooldownMap.set(key, Date.now());
}

function checkRemaning(memberid, cmd) {
  const key = cmd.NAME + "-" + memberid;
  if (cooldownMap.has(key)) {
    const remaining = (cooldownMap.get(key) - Date.now()) * 0.01;
    if (remaining > cmd.cooldown) {
      cooldownMap.delete(key);
      return;
    }
    return cmd.SETTINGS.COOLDOWN - remaining;
  }
  return;
}
