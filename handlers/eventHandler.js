const fs = require('fs');
const chalk = require('chalk')
const AsciiTable = require('ascii-table')

var table = new AsciiTable()
table.setHeading('Events', 'Loaded').setBorder('║', '=', '.')

module.exports = (client) => {
    fs.readdirSync('./util/events/').filter((file) => file.endsWith('.js')).forEach((event) => {
        try {
      	    require(`../util/events/${event}`);
            table.addRow(event, '✅')
        } catch(e) {
            table.addRow(event, '❌')
        }
    })
	console.log(chalk.cyan(table.toString()))
};
