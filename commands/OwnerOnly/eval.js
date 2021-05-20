const { Client, Message, MessageEmbed } = require('discord.js');
const { inspect } = require('util')

module.exports = {
    name: 'eval',
    description: 'Owner Only!....',
    aliases: [''],
    category: 'OwnerOnly',
    usage: '<Code>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (message.author.id !== '789390364222029834') return;

        const code = args.join(' ');
        if (!code) return message.reply('Please Provide a Code!');

        try {
        const result = await eval(code);
        let output = result;
        if (typeof result !== 'string') {
            output = inspect(result)
            }
        message.channel.send(output, {code: 'js'})
        } catch(error) {
            console.log(error)
            message.channel.send('Evaulated content is too Long To Display!')
        }
    }
}