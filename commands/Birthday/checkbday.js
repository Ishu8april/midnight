const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/bday')

module.exports = {
    name: 'checkbday',
    description: 'Check your Birthday!',
    aliases: [],
    category: 'Birthday',
    usage: '<User>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        Schema.findOne({ User: user.id }, async(err, data) => {
            if (!data) return message.lineReply(`${user.tag} Does Not have a Birthday Set!`);
            message.channel.send(
                new MessageEmbed()
                    .setTitle(`Birthday of ${user.tag}`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`${user.tag}'s Birthday is on ${data.Birthday}`)
                    .setColor('RANDOM')
            )
        })
    }
}