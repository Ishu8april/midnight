const client = require('../index');
const { MessageEmbed } = require ('discord.js');

client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === 'text' &&
            !channelToSend &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        ) channelToSend = channel;
    });

    if (!channelToSend) return ;

    channelToSend.send(
        new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setDescription(`Thanks For Inviting Me to **${guild.name}**!\nMy Default Prefix is "m!"\nRun \`m!help\`WS For a Basic List Of my commands!`)
    )
})