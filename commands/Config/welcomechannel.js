const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/welcomeChannel')

module.exports = {
    name: 'setchannel',
    description: 'Set welcome channel',
    aliases: ['wc'],
    category: 'Config',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        const channel = message.mentions.channels.first();

        if (!channel) message.lineReply('Mention a Channel!')

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id,
                }).save();
            }   
            message.lineReplyNoMention(`${channel} has been set as the welcome Channel!`)
        });
    },
};