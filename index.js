/*
 * npm install discord.js@14.0.3
 * npm init
 * node .
*/

const { readdirSync } = require("fs");
const fs = require("fs");

const { Client, Intents } = require('discord.js'),
    config = require("./conf/botconfig.json"),
    client = new Client({ allowedMentions: { parse: ["roles", "everyone", "users"], repliedUser: false }, partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: Intents.all })


/* 
    * Possible Edits
     We dont need as many intents, these are basically all of them and I just added them to prevent **intent errs**

    ! Slash Command Setup
     const { REST } = require("@discordjs/rest");
     const { Routes } = require("discord-api-types/v9");

    ? Possible Modules
     @ ( ascii-table ) If we would like to have a clean startup logging this would be useful
     @ ( chalk )
     @ ( captcha-canvas ) I dont know if you want this but we could have a capthca verification system

    ? Client Config Additions ( For HELP cmd )
     client.commands = new Collection(); 
     client.aliases = new Collection(); 
*/ 



module.exports = client;
client.botconfig = config;
client.logger = new loggerHandler();
client.embed = new MessageEmbed();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client);
});

client.login(config.token);