const config = require('../../conf/botconfig.json')
const enablers = require('../../conf/enablers.json')

const client = require('discord.js')

module.exports = {
    name: 'quarentine-setup',
    aliases: ['qsetup', 'setupq', 'quarentinesetup', 'setupquarentine'],
    description: 'Setup quarentine roles and functionality',
    usage: '',
    run: async (client, message, args) => {
        try {

        } catch(err) {
            return message.reply(`There was an error \`${err.message}\``), console.log(`Error running, \n Err Message: ${err.message} \n Command Ran: ${message.content}`)
        }
    }
}

/*
```ini
[ Quarentine Setup ]
    
On [ quarentine-setup ]
    | Check if "QuarentineState" == true
    | If false
        > Check if bot has administrator
        > If bot has administrator
            + Check if bot has highest position in roles
            + If bot has highest role
                > attempt to add role that cant view any channel with quarentine name
                > if succeeded
                    + let user know
                    + return
                > if unsucceded
                    + log err message
                    + let the user know err message
                    + return

    
        > If bot doesn't have administrator
            + let user know bot doesnt have administrator
            + return
    | If true 
        > let user know "Quarentine has already been setup"
        > let user know "Would you like to clear quarentine" with button
        > If button yes
            + edit message to say "Run ${message.content} clear"
            + return
        > If button no
            + return

On [ quarentine-setup clear ]
    | Check if "QuarentineState" == true
    | If false
        > Tell the user that quarentine hasnt been setup
        > return
    | If true
        > check if bot has admin/edit-roles perms
        > if true
            + check if bot is above quarentine role
            + if true
                > remove role
                > let user know
                > return
            + if false
                > let user know
                > return
        
        > if false
            + let user know
            + return

[
    This is sort of just a basic "explanation" of the logic

    In reality on the command **ONE** message will be sent and evertime the user needs to know something the message will be edited
    There will be things that have to be added or removed but that will be up to who makes the command
    All commands must follow one theme though we can discuss that some time
]
*/