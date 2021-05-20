const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord')

module.exports = {
    name: 'slap',
    description: 'go and SLAP someone ( ͡° ͜ʖ ͡°)',
    aliases: [],
    category: 'Image',
    usage: '<@user>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first()

        const avatar = user.displayAvatarURL({ format: 'png' });

        const image = await Canvas.opinion(message.author.displayAvatarURL({ format: 'png' }), "HIiii")

        message.channel.send(new MessageAttachment(image, "image.png"))
    }
}