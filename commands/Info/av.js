const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    category: 'Info',
    description: 'Gives the avatar of a user',
    usage: '[@user/id]',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */ 
     run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        await message.channel.send(
            new MessageEmbed()
                .setAuthor(`${user.tag}'s Avatar`, user.displayAvatarURL())
                .setImage(user.displayAvatarURL({ dynamic: true }))
                .setColor('RANDOM')
        )
    }

}