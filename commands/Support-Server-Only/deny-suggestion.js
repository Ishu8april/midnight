const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'deny-suggestion',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        if (message.guild.id === '811864465430675486') {
            if (message.author.id === '789390364222029834') {
                const messageID = args[0];
                const q = args.slice(1).join(" ");
                try {
                    const sugch = message.guild.channels.cache.get('842705997867778089');
                    const suggestion = await sugch.messages.fetch(messageID);
                    const data = suggestion.embeds[0]
                    const acceptEmbed = new MessageEmbed()
                        .setAuthor(data.author.name, data.author.iconURL)
                        .setDescription(data.description)
                        .setColor('RED')
                        .addField('Status (DENIED)', q)

                    if (!messageID) return message.channel.send('Please Provide a Message id')
                    if (!q) return message.channel.send('Specify a valid Reason!')

                    suggestion.edit(acceptEmbed)

                    const user = client.users.cache.find((u) => u.tag === data.author.name);
                    user.send('Your Suggestion has Been Denied! - ' + suggestion.url)
                    message.channel.send('Denied the Suggestion!')
                } catch (err) {
                    message.channel.send(' That Suggestion Doesnt Exist!')
                    console.log(err)
                }
            } else {
                message.channel.send('This Command is Owner only!')
            }
        } else {
            message.channel.send('This Command can only be Run In the Support Server!')
        }
    }
}