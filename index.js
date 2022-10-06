// Imports: Node
const fs = require("fs");

// Imports: Discord.js
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

// WARNING
// This is an import with hidden side effects. To understand what this does
// requires a mandatory visit to documentation (that of which is not linked
// here). Consider reworking this so that it becomes painfully obvious what is
// happening here.
require("dotenv").config();

// Imports: Local
const config = require("./config.json");

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
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
  ],
});

/*

https://discordjs.guide/popular-topics/partials.html#enabling-partials - Partials Documentation, Line 17
https://discordjs.guide/popular-topics/intents.html#privileged-intents - Intents Documentation, Line 6 - 16

*/

// WARNING
// Are we allowed to add random properties to the client object? This throws
// off the public interface for Client. This could confused contributors as to
// where these properties are coming from. This would also require contributors
// to keep this change in mind when working around the client.
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.all = new Collection();
client.prefix = config.prefix;

// WARNING
// This looks like a nasty setup for cirucluar dependency. Not only would
// contributors have to consider the implications of importing this file where
// client is needed, but they'll also have to follow the import chain back to
// figure out why we are importing the main file in other files to begin with.
// Do not do this.
module.exports = client;

// By this point, I don't think I need to explain why this is an absolute mess.
fs.readdirSync("./handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
