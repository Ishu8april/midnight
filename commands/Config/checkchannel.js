const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/welcomeChannel')

module.exports = {
    name: 'checkchannel',
    description: 'Check the Welcome channel',
    aliases: [],
    category: 'Config',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (!data)  return message.channel.send('No Welcome Channel set!')

            const channel = client.channels.cache.get(data.Channel);

            message.lineReply(`Welcome Channel is ${channel}`);
        });
    }
}