const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pull',
    description: 'Pull Other peeps to your voice channel UwU',
    usage: '<User>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send('hajfnad')

        const member = message.mentions.members.first();
        if (!member) return message.lineReply("please Mention a Member!")
        if (!member.voice.channel) return message.lineReply("The Member You Mentioned isnt in a voice channel!")
        if (!message.member.voice.channel) return message.lineReply("You must be in a Voice Channel to use this Command!")

        member.voice.setChannel(message.member.voice.channel);
        message.channel.send('MOved')
    },
};