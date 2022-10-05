const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js'),
      fs = require("fs"),
      config = require("./config.json");

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

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.prefix = config.prefix;

module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});
  
client.login(config.Authorization.Token)