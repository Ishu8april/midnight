const db = require('../../models/warns')
const Discord = require('discord.js')

module.exports = {
    name : 'remove-warn',
    category: 'Moderation',
    description: ' Removes the Warns of a Member',
    aliases: ['rw', 'rmvwarn'],
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                const rmvwarnembed = new Discord.MessageEmbed()
                .setTitle('Successfully Deleted The First Warn of the User!')
                message.channel.send(rmvwarnembed)
                data.save()
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
    }
}