const { MessageEmbed, Collection } = require("discord.js");
const guildEvent = (event) => require(`../../events/${event}`);

function events(client) {  
  client.on("interactionCreate", (intEvent) => guildEvent("interactionCreate")(intEvent, client));
  client.on("warn", (warningEvent) => console.log(warningEvent));
  client.on("error", console.error);
}

module.exports = { events };