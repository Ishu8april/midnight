const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../reconDB')


module.exports = {
    name: 'afk',
    description: 'Sets an AFK Status!',
    category: 'Utility',
    usage: '[Reason]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let content = args.join(" ")
        if (!content) content = "AFK"
        await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
        const embed = new MessageEmbed()
            .setDescription(`You have been set to afk\n**Reason :** ${content}`)
            .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}