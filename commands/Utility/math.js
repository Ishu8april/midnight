const { Client, Message, MessageEmbed } = require('discord.js');
const math = require('mathjs')

module.exports = {
    name: 'math',
    description: 'Do Calculations!',
    usage: '<Equation>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        try {
            message.channel.send(
                new MessageEmbed()
                    .addField('Question', args.join(' '))
                    .addField('Solution', math.evaluate(args.join(" ")))
            )
        } catch (err) {
            message.channel.send('Your Question is not Valid!')
        }
    }
}