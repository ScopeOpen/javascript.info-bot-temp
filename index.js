// Imports: Node
import { readdirSync as readDirSync } from "fs";

// Imports: Discord.js
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";

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
//require("dotenv").config({ path: "./.env" });

// Imports: Local
import { getFileTree } from "./helpers/get-file-tree.mjs";
import { readJSONFromFile } from "./helpers/read-json-from-file.mjs";
const { prefix } = readJSONFromFile("./config.json");

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
client.prefix = prefix;

// WARNING
// This looks like a nasty setup for cirucluar dependency. Not only would
// contributors have to consider the implications of importing this file where
// client is needed, but they'll also have to follow the import chain back to
// figure out why we are importing the main file in other files to begin with.
// Do not do this.
export default client;

// By this point, I don't think I need to explain why this is an absolute mess.

async function _import(path) {
  return await import(path);
}

for (const entry of getFileTree("./handlers")) {
  if (entry.isFile) {
    const { handler } = await import(entry.path);
    handler?.(client, { _import, getFileTree });
  }
}

//client.login(process.env.TOKEN);
