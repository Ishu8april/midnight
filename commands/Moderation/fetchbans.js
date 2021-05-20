const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'fetchbans',
    description: 'Fetches all Banned Peeps',
    aliases: ['fb'],
    category: 'Moderation',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You need Ban Members Perms for this!')

        const fetchbans = message.guild.fetchBans();
        const bannedpeps = (await fetchbans).map((member) => `\`${member.user.tag}\``).join("\n")

        message.channel.send(bannedpeps)
    }   
}