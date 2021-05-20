const { Client, Message, MessageEmbed } = require('discord.js');
const figlet = require('figlet')

module.exports = {
    name: 'ascii',
    description: 'Ascii text',
    category: 'Text',
    usage: '<Message>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args) return message.lineReplyNoMention('Provide a Message!')

        figlet.text(args.join(" "), {
            font: "",
        }, async(err, data) => {
            message.channel.send(`\`\`\`${data}\`\`\``)
        })
    }
}