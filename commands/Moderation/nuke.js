const { Message } = require('discord.js')

module.exports = {
    name: 'nuke',
    description: 'Clones the channel and deletes it',
    category: 'Moderation',
    /**
     * 
     * @param {*} client
     * @param {Message} message
     * @param {*} args
     */

    run: async(client,message,args) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return;
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.author.send('I dont have Manage Channels Permission!')

        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send(`${message.author.tag} Nuked this Channel!:boom: `)
        })
    }
}