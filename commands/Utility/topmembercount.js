const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'topmembercount',
    aliases: ['tmc'],
    category: 'Utility',
    description: 'Tells The Top Member Count Servers!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);

        const description = guilds.map((guild, index) => {
            return `${index+1}) ${guild.name} - ${guild.memberCount} members`
        }).join('\n')

        message.channel.send(
            new MessageEmbed()
            .setTitle('Top Guilds')
            .setDescription(description)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor('RANDOM')
        )
    }
}