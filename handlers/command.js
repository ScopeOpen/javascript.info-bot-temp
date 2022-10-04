const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const chalk = require('chalk');

let table = new ascii('Commands');

table.setHeading('Command', ' Load status');
module.exports = (client) => {
	readdirSync('./commands/').forEach(dir => {
		const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
		for(let file of commands){
			let pull = require(`../commands/${dir}/${file}`);
			if(pull.name){
				client.commands.set(pull.name, pull);
				table.addRow(file, '✅');
			} else {
				table.addRow(file, '❌ Missing name or name isn\'t a string');
				continue;
			} if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
		}
	});

	readdirSync('./events/').forEach((file) => {
		const events = readdirSync('./events/').filter((file) => file.endsWith('.js'));
        
		for (let file of events) {
			let pull = require(`../events/${file}`);
			if (pull.name) {
				client.events.set(pull.name, pull);
			} else {
				continue;
			}
		}
	});
};