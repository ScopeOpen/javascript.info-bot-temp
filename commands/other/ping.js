module.exports = {
  NAME: "ping",
  DESCRIPTION: "IDK",
  CATEGORY: "FUN",
  USERPERMS: [],
  BOTPERMS: [],
  SETTINGS: {
    COOLDOWN: 0,
    ENABLED: true,
    MINARGS: 0,
    MAXARGS: 0,
    ALIASES: [],
  },
  msgRun: async (client, message, args) => {
    const msg = await message.reply("Pinging...");
    await msg.edit(`Pong! **${client.ws.ping} ms**`);
  },
};
