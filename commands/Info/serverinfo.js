const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Server Info!',
    aliases: ['si'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle(`Server Info for ${message.guild.name}`)
            .addFields(
                {
                    name: 'Name',
                    value: message.guild.name,
                    inline: true
                },
                {
                    name: 'Owner',
                    value: `<@${message.guild.ownerID}>`,
                    inline: true
                },
                {
                    name: 'Member Count',
                    value: message.guild.memberCount,
                    inline: true
                },
                {
                    name: 'Guild id',
                    value: message.guild.id,
                    inline: true
                },
                {
                    name: 'Features -',
                    value: message.guild.features,
                    inline: true
                },
                {
                    name: 'Created At',
                    value: message.guild.createdAt,
                    inline: true
                },
                {
                    name: 'Joined At',
                    value: message.guild.joinedAt,
                    inline: true
                }
            )
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('RANDOM')

        message.channel.send(embed)
    }
}