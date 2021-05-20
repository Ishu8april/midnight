const client = require('../index')
const { MessageEmbed } = require('discord.js');
const logsChannel = '842705755488780288'

client.on('guildCreate', (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
            .setTitle('NEW SERVER ADDED!')
            .addField('Guild INFO', `${guild.name} (${guild.id}) **${guild.memberCount} members!**`)
            .addField('Owner Info', `${guild.owner} (${guild.owner.id})`)
            .setFooter(`Currently in ${client.guilds.cache.size} Servers!`)
            .setTimestamp()
            .setColor("GREEN")
    );
});

client.on('guildDelete', (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
            .setTitle('NEW SERVER REMOVED!')
            .addField('Guild INFO', `${guild.name} (${guild.id}) **${guild.memberCount} members!**`)
            .addField('Owner Info', `${guild.owner} (${guild.owner.id})`)
            .setFooter(`Currently in ${client.guilds.cache.size} Servers!`)
            .setTimestamp()
            .setColor("RED")
    )
})