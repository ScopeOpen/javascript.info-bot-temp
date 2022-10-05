const { Collection } = require("discord.js");
const config = require("../../config.json");
const	client = require("../../index.js");
const ms = require("ms");

const cooldownMap = new Map();
const Embed = config.Embed

client.on("messageCreate", async (message) => {
	const prefix = config.Configuration.Prefix
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

});

module.exports = {
	getComandUsage() {

	}

};

function applyCooldown(memberid, cmd) {
	const key = cmd.name + '-' + memberid
	cooldownMap.set(key, Date.now());
}

function checkRemaning(memberid, cmd) {
	const key = cmd.name + '-' + memberid
	if(cooldownMap.has(key)) {
		const remaining = (cooldownMap.get(key) - Date.now()) * 0.01;
		if(remaining > cmd.cooldown) {
			cooldownMap.delete(key);
			return;
		}
		return cmd.cooldown - remaining;
	}
	return;
}

/*
	if (message.content.bot) return;
  	if (message.channel.type !== 0) return;
  	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
  	let command = client.commands.get(cmd);
  	if (!command) command = client.commands.get(client.aliases.get(cmd));


  	if (command) {
		function embeds() {
			command.botPerms.forEach((element) => {
				if(!message.member.permissions.has.element) {
					const USERPERMS = new EmbedBuilder()
					.setDescription(`You don't have \`${command.userPerms}\` permissions to use this command!`)
					.setColor('Red')
					return message.reply({ embeds: [USERPERMS] })
				}
				if(!message.guild.members.cache.get(client.user.id).permissions.has.element) {
					const BOTPERMS = new EmbedBuilder()
					.setDescription(`I don't have \`${command.botPerms}\` permissions to use this command!`)
					.setColor('Red')
					return message.reply({ embeds: [BOTPERMS] })
				}
			})
		}
    		if (command.cooldown) {
      		if (cooldown.has(`${command.name}-${message.author.id}`)) { message.channel.send({ content: config.Configuration.Messages.COOLDOWN.replace( "<duration>", ms( cooldown.get(`${command.name}-${message.author.id}`) - Date.now(), { long: true } ) ), }); return; }
      
			if (command.USERPERMS || command.BOTPERMS) {
      			if (cooldown.has(`${command.name}-${message.author.id}`)) {
					embeds()
      			}
      		}

			command.run(client, message, args)
			cooldown.set(`${command.name}-${message.author.id}`, Date.now() + command.cooldown)
			setTimeout(() => {
				cooldown.delete(`${command.name}-${message.author.id}`)
			}, command.cooldown);
    		} else {
			if(command.userPerms || command.botPerms) {
				embeds()
			}
			command.run(client, message, args)
		}

		
		
  	}
*/