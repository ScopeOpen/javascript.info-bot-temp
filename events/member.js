const client = require('../index');
const config = require('../conf/botconfig.json');

client.on('guildMemberAdd', async (member, guild) => {
    if(`${config.ServerBlacklisted}`.includes(member.id)) {
        // If we wanna add an automatic quarentining of a blacklisted user itll go here
    } 


})

client.on('guildMemberRemove', async (member, guild) => {
    
})