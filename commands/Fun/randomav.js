const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'random-avatar',
    aliases: ['randomav', 'rav'],
    description: 'Sends a random Avatar of a User',
    category: 'Fun',
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     */
    run: async(client, message) => {
        const user = client.users.cache.random();

        message.channel.send(
            new MessageEmbed()
                .setFooter(`${user.tag}'s Avatar`, user.displayAvatarURL())
                .setImage(user.displayAvatarURL({ dynamic: true }))
                .setColor('RANDOM')
        )
    }

}