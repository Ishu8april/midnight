const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'badges',
    category: 'Info',
    usage: 'User',
    description: 'Returns The Discord Badges of a user',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author
        if (!user) user = args[0]

        const flags = user.flags.toArray();

        console.log(flags);
        
        message.channel.send(`${user}'s badges: ${flags.join(', ')}`)
    }
}