const { Client, Message, MessageEmbed } = require('discord.js');
const query = require('esquery');

module.exports = {
    name: 'report',
    description: 'Report a Bug!',
    category: 'Utility',
    usage: '<Bug>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const owner = client.users.cache.get('789390364222029834');

        const q = args.join(' ');
        if (!q) return message.reply('Please Tell What is the Bug!');

        const reportEmbed = new MessageEmbed()
            .setTitle('NEW BUG!')
            .addField("Author", message.author.toString(), true)
            .addField('Guild', message.guild.name, true)
            .addField('Report', q)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor('RED')
            .setTimestamp();

        owner.send(reportEmbed)
    }
}