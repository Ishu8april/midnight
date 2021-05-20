const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'message',
    description: 'DM your friend with a Message!',
    aliases: ['dm'],
    category: 'Fun',
    usage: '<User Id> [-a](To Send Message Anonymously)',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;
        if (!user) return message.reply('Specify a User to DM!')



        const str = args.slice(1).join(' ')
        if (message.content.includes("-a")) {
            const a = new MessageEmbed()
                .setTitle('You have a Message!')
                .setDescription(str.replace("-a", ""))
                .setColor('RANDOM')
                .setFooter('Who Sent You this message?....')
            user.send(a);
        } else {
            const b = new MessageEmbed()
                .setTitle('You have a Message!')
                .setDescription(str)
                .setColor('RANDOM')
                .setFooter(`Sent By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            user.send(b)
        }
    }
}