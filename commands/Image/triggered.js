const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord')

module.exports = {
    name: 'triggered',
    description: 'TRIGGERED............',
    aliases: [],
    category: 'Image',
    usage: '<@user>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const avatar = user.displayAvatarURL({ format: 'png' });

        const image = await Canvas.trigger(avatar)

        message.channel.send(new MessageAttachment(image, "image.gif"))
    }
}