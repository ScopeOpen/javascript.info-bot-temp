const config = require('../../conf/botconfig.json')
const enablers = require('../../conf/enablers.json')
const embedConf = require('../../conf/embed.json')

const client = require('discord.js')

module.exports = {
    name: 'quarentine-setup',
    aliases: ['qsetup', 'setupq', 'quarentinesetup', 'setupquarentine'],
    description: 'Setup quarentine roles and functionality',
    usage: '',
    run: async (client, message, args) => {
        try {

            if(embedConf.AUTHOR == "dependent") {

            }

            if(embedConf.AUTHORIMAGE == "dependent") {

            }

            // I believe whats above can be added to index.js to make it smaller, ill figure out

        } catch(err) {
            return message.reply(`There was an error \`${err.message}\``), console.log(`Error running, \n Err Message: ${err.message} \n Command Ran: ${message.content}`)
        }
    }
}

