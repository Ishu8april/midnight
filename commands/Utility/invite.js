const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'invite',
    description: 'Sends the bot Invite Link!',
    category: 'Utility',

    run: async(client, message, args) => {
        message.channel.send(
            new MessageEmbed()
                .setTitle('Click Here to Invite me!')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=839479396158799932&permissions=8&scope=bot%20applications.commands')
                .setDescription('Thanks For Inviting!\n Join The Support Server - https://discord.gg/xXhpTasRwM')
                .setThumbnail('https://cdn.discordapp.com/avatars/839479396158799932/854bc981bb3b6e185da07248fe2ba07f.png?size=256')
                .setColor('RANDOM')
        )
    }
}