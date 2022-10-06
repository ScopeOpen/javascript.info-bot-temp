const fs = require('fs');
const chalk = require('chalk')
const AsciiTable = require('ascii-table')

var table = new AsciiTable()
table.setHeading('Commands', 'Loaded').setBorder('║', '=', '.')

module.exports = (client) => {
	fs.readdirSync('./commands/').forEach(dir => {
		const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
		if(!files || files.legnth <= 0) console.log(chalk.red("Commands - 0"))
				files.forEach((file) => {
						let command = require(`../commands/${dir}/${file}`)
						if(command) {
								client.commands.set(command.NAME, command);
								client.all.set(command)
								if(command.ALIASES && Array.isArray(command.ALIASES)) {
										command.ALIASES.forEach(alias => {
												client.aliases.set(alias, command.NAME)
										})
								}
								table.addRow(command.NAME, '✅')
						} else {
								table.addRow(file, '❌')
						}
				});
	});
	console.log(chalk.blue(table.toString()))
};