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
// SOLUTION
// When able, be as explicit as possible. Adding the file path here might seem
// redundant, but this line becomes much more obvious if you do.

// https://www.npmjs.com/package/dotenv
// Pull secret keys and private tokens from a file named ".env".
// DANGER: Do NOT `git add` or `git push` this file to the repository (local or
//         remote). The file name has been included in the ".gitignore" file
//         to keep you from doing so. Do not share your secret key/tokens.
require("dotenv").config({ path: "./.env" });

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


client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.all = new Collection();
client.prefix = config.prefix;


module.exports = client;

// By this point, I don't think I need to explain why this is an absolute mess.
fs.readdirSync("./handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
