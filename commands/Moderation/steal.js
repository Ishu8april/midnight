const { Client, Message, MessageEmbed, Util } = require('discord.js');

module.exports = {
    name: 'steal',
    description: 'Steals an Emoji ;)',
    aliases: [],
    category: 'Moderation',
    usage: '<Emoji> (not a gif or image, a proper discord emoji)',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.reply('You need Manage Emojis Perms!');

        if (!args.length) return message.reply('Specify some emojis!')

        for (const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if (!parsedEmoji.id) {
                const extension = parsedEmoji.animated? ".gif" : ".png"
                const url = `https://cdn.discordapp.com/emojis${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => message.channel.send(`Added The Emojis -\n ${emoji.url}`));
            }
        }
    },
}