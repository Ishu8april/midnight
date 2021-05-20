const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/chatbot')

module.exports = {
    name: 'setchatbot',
    description: 'Set the Chatbot Channel!',
    usage: '<channel>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) return;

        const channel = message.mentions.channels.first() || message.channel;
        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) data.delete();
            new Schema({
                Guild: message.guild.id,
                Channel: message.channel.id,
            }).save();
            message.channel.send(`Saved chatbot Channel to ${channel}`);
        })
    }
}