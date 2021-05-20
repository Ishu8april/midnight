const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    description: 'Sets Slowmode!',
    aliases: ['sm'],
    category: 'Moderation',
    usage: '[Slowmode Time](Ignore If you want to reset Slowmode)',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You need Manage messages Permission!')
        if (!args[0]) {
            message.channel.setRateLimitPerUser(0)
            return message.channel.send('Slowmode Has Been Removed!')
        }

        const raw = args[0]
        const time = ms(raw)

        if (isNaN(time)) return message.reply('Enter a valid time in `s` ,`m` or `h`')

        if (time < 1000) return message.reply('The Minimum Slowmode is 1 Second.')

        message.channel.setRateLimitPerUser(time / 1000);
        message.channel.send(`The Slowmode For <#${message.channel.id}> Has Been Set to ${ms(time, {long: true})}`)
    }
}