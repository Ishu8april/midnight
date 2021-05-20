const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'suggest',
    description: 'Suggest Something In the Support Server!',
    category: 'Support Server Only',
    usage: '<Suggestion',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        if (message.guild.id === '811864465430675486') {
            const query = args.join(' ');
            if (!query) return message.reply('Please Specify what you want to Suggest!');

            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`**SUGGESTION**: ${query}`)
                .setColor('RANDOM')
                .setTimestamp()
                .addField("Status", 'PENDING')

            message.channel.send('Submitted Your Suggestion! Check <#842705997867778089> For Your Suggestion Status!')
            message.guild.channels.cache.get('842705997867778089').send(embed)
        } else {

            return message.channel.send('This Command Can only Be Run in the Support Server! https://discord.gg/ACZabwNhwf')
        }
    }
}
