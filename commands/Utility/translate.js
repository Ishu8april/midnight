const { Client, Message, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate')

module.exports = {
    name: 'translate',
    description: 'Translate a Message to English!',
    usage: '<Message>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const q = args.join(" ");
        if (!q) return message.lineReply("Specify a message to translate!");

        const translated = await translate(q, { to: 'en' });

        message.channel.send(translated.text);
    },
};