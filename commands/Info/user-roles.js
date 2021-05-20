const { CLient, Message, MessageEmbed } = require('discord.js')

module.exports = {
        name: 'user-roles',
        aliases: ['ur', 'memberroles'],
        description: 'Lists all the Roles of a User!',
        usage: '<User>',
        /**
         * @param {Client} client
         * @param {Message} message
         * @param {String[]} args
         */
        run: async(client,message,args) => {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

            if (!member) return message.reply('Specify a User Whose roles you want to display!');

            let memberRoles = member.roles.cache  
                .filter((roles) => roles.id !== message.guild.id)
                .map((role) => role.toString());    

            message.channel.send(
                new MessageEmbed()
                    .setAuthor(`${member.user.tag}'s Roles`, member.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(memberRoles)
                    .setColor('RANDOM')
            )
            console.log(memberRoles)
        }
}