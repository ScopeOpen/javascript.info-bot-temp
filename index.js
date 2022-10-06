const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js'),
      fs = require("fs"),
      config = require("./config.json");

require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [ Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction ]
})

/*

https://discordjs.guide/popular-topics/partials.html#enabling-partials - Partials Documentation, Line 17
https://discordjs.guide/popular-topics/intents.html#privileged-intents - Intents Documentation, Line 6 - 16

*/

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.all = new Collection();
client.prefix = config.prefix;

module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

client.login(process.env.TOKEN)