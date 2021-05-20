const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('discord-canvas')

module.exports = {
    name: 'test',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const image =  new Canvas.Goodbye()
            .setUsername("xhjifha")
            .setDiscriminator("0001")
            .setMemberCount("140")
            .setGuildName("Server DEV")
            .setAvatar(message.author.displayAvatarURL({ format: 'png'}))
            .setColor("border", "#8015EA")
            .setColor("username-box", "#8015EA")
            .setColor("discriminator-box", "#8015EA")
            .setColor("message-box", "#8015EA")
            .setColor("title", "#8015EA")
            .setColor("avatar", "#8015EA")
            .setBackground(message.author.displayAvatarURL({ format: 'png'}))
            .toAttachment();

        const attachment = new MessageAttachment((await image).toBuffer(), "goodbye-image.png");

        message.channel.send(attachment);
    }
}